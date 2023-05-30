const { initBox, setPosition, getBox } = require("./box.js");
const { getScore, updatePps } = require("./container.js");
const { rotation, perturbation } = require("./boxMotion.js");

const { orderMetric, overallMetric } = require("./metrics.js");

/*

The purpose of the algorithm is to position each box inside the conatiner in the best way possible.
It is done by placing a box, see if it fits, and then add the points it generates.

So:
1. For every box:
	1.1. For every pp:
		1.1.1. position the box in the pp, TODO: check if p[3] == 1, place it accordingly
		1.1.2. If it fits - check if it gets a better score, else - continue.
				check for score: Check if it validates.
*/

const getBestPoint = (pp, box, container, solutionBoxes) => {
	let bestPoint = null;
	let bestScore = [0, 0];

	pp.forEach((p) => {
		// Now the box has and position and center.
		let score = getScore(box, p, solutionBoxes, container);
		if (
			score[0] > bestScore[0] ||
			(score[0] === bestScore[0] && score[1] > bestScore[1])
		) {
			bestPoint = p;
			bestScore = score;
		}
	});

	return bestPoint;
};

const addBoxToSolution = (
	bestPoint,
	box,
	pp,
	solutionBoxes,
	solution_data,
	retryList,
	container,
	isRetry
) => {
	if (bestPoint) {
		setPosition(box, bestPoint);
		pp = updatePps(box, bestPoint, pp, container);
		solutionBoxes.push(box);
		solution_data["number_of_items"] += 1;
		solution_data["capacity"] += box.volume;
	} else {
		if (!isRetry) {
			retryList.push(box);
		} else {
			solutionBoxes.push(box);
		}
	}
};

const handleBox = (
	box,
	pp,
	container,
	solutionBoxes,
	solution_data,
	retryList,
	isRetry
) => {
	const bestPoint = getBestPoint(pp, box, container, solutionBoxes);
	addBoxToSolution(
		bestPoint,
		box,
		pp,
		solutionBoxes,
		solution_data,
		retryList,
		container,
		isRetry
	);
};

const constructive_packing = (boxes, container, isQuantity) => {
	let pp = new Set([
		{
			x: 0,
			y: 0,
			z: 0,
			dir: 1,
		},
		{
			x: container.width,
			y: 0,
			z: 0,
			dir: -1,
		},
	]);

	let solutionBoxes = [];
	let retryList = [];

	let solution_data = {
		number_of_items: 0,
		capacity: 0,
		order_score: 0,
		overall_score: 0,
	};

	boxes.forEach((box) => {
		handleBox(
			box,
			pp,
			container,
			solutionBoxes,
			solution_data,
			retryList,
			false
		);
	});

	retryList.forEach((box) => {
		handleBox(
			box,
			pp,
			container,
			solutionBoxes,
			solution_data,
			retryList,
			true
		);
	});

	solution_data.order_score = parseFloat(
		orderMetric(solutionBoxes, container)
	);
	solution_data.overall_score = parseFloat(
		overallMetric(boxes, container, solution_data, isQuantity)
	);
	return [solutionBoxes, solution_data];
};

const handleData = (data) => {
	const isQuality = data.project_data.isQuality;
	const numOfIterations = isQuality ? 2000 : 1000;
	const isQuantity = data.project_data.isQuantity;
	const container = data.container;
	const boxes = data.boxes;

	const initBoxes = boxes.map((box) => {
		return initBox(box);
	});

	initBoxes.sort((a, b) => (a.order > b.order ? -1 : 1));
	return [initBoxes, container, numOfIterations, isQuantity];
};

const getSolutions = (numOfIterations, boxes, container, isQuantity) => {
	let solutionList = {};
	let counter = 0;
	for (let i = 0; i < numOfIterations; i++) {
		let boxesCopy = [...boxes];
		boxesCopy = rotation(boxesCopy);
		boxesCopy = perturbation(boxesCopy);
		let solution = constructive_packing(boxesCopy, container, isQuantity);
		if (solution === null) {
			continue;
		}
		let [boxesInSolution, solution_data] = solution;
		if (boxesInSolution !== null && solution_data !== null) {
			let counterString = counter.toString();
			solutionList[counterString] = {
				name: "solution " + counterString,
				id: counter,
				boxes: boxesInSolution.map((box) => {
					return getBox(box);
				}),
				solution_data: solution_data,
			};
			counter += 1;
		}
	}
	return solutionList;
};

const sortByPreference = (solutionList, isQuantity) => {
	if (isQuantity) {
		solutionList = Object.values(solutionList)
			.sort(
				(a, b) =>
					b.solution_data.number_of_items -
					a.solution_data.number_of_items
			)
			.slice(0, 50);
		solutionList = solutionList
			.sort((a, b) => b.solution_data.capacity - a.solution_data.capacity)
			.slice(0, 25);
		solutionList = solutionList
			.sort(
				(a, b) =>
					a.solution_data.order_score - b.solution_data.order_score
			)
			.slice(0, 10);
	} else {
		solutionList = Object.values(solutionList)
			.sort(
				(a, b) =>
					a.solution_data.order_score - b.solution_data.order_score
			)
			.slice(0, 20);
		solutionList = solutionList
			.sort(
				(a, b) =>
					b.solution_data.number_of_items -
					a.solution_data.number_of_items
			)
			.slice(0, 15);
		solutionList = solutionList
			.sort((a, b) => b.solution_data.capacity - a.solution_data.capacity)
			.slice(0, 10);
	}
	solutionList = solutionList.sort(
		(a, b) => b.solution_data.overall_score - a.solution_data.overall_score
	);
	return solutionList;
};

// const sortByQuantity = (solutionList, isQuantity) => {
// 	solutionList = Object.values(solutionList)
// 		.sort(
// 			(a, b) =>
// 				b.solution_data.number_of_items -
// 				a.solution_data.number_of_items
// 		)
// 		.slice(0, 10);
// 	return solutionList;
// };

const dictSolutionsFromList = (solutionList) => {
	let solutionDict = {};
	for (let index = 0; index < solutionList.length; index++) {
		let indexString = index.toString();
		solutionDict[indexString] = solutionList[index];
	}
	return solutionDict;
};

const algo = (data) => {
	const [boxes, container, numOfIterations, isQuantity] = handleData(data);
	let solutionList = getSolutions(
		numOfIterations,
		boxes,
		container,
		isQuantity
	);

	solutionList = sortByPreference(solutionList, isQuantity);

	solutionList = solutionList.map((solution, index) => {
		return { ...solution, name: `solution ${index + 1}` };
	});

	let solutionDict = dictSolutionsFromList(solutionList);

	return solutionDict;
};

module.exports = { algo, handleBox };
