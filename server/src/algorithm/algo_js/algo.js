import { initBox, setPosition, getBox } from "./box.js";
import { getScore, updatePps } from "./container.js";
import { rotation, perturbation } from "./boxMotion.js";
import { orderMetric, overallMetric } from "./metrics.js";

const ALGOIRTHM_MAX_ITERATIONS = 1000000;

const getBestPoint = (pp, box, container, solutionBoxes) => {
	let bestPoint = null;
	let bestScore = [0, 0];

	pp.forEach((p) => {
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
	data,
	retryList,
	container,
	isRetry
) => {
	if (bestPoint) {
		setPosition(box, bestPoint);
		pp = updatePps(box, bestPoint, pp, container);
		solutionBoxes.push(box);
		data["numberOfItems"] += 1;
		data["capacity"] += box.volume;
	} else {
		if (!isRetry) {
			retryList.push(box);
		} else {
			solutionBoxes.push(box);
		}
	}
};

export const handleBox = (
	box,
	pp,
	container,
	solutionBoxes,
	data,
	retryList,
	isRetry
) => {
	const bestPoint = getBestPoint(pp, box, container, solutionBoxes);
	addBoxToSolution(
		bestPoint,
		box,
		pp,
		solutionBoxes,
		data,
		retryList,
		container,
		isRetry
	);
};

const constructivePacking = (boxes, container, isQuantity) => {
	/*
	Initialize potential points as the FLB and FRB of the container.
	Each point has a direction that indicates which corner of a box should be at the point.
	1 = FLB, -1 = FRB.
	*/

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

	let data = {
		numberOfItems: 0,
		capacity: 0,
		orderScore: 0,
		overallScore: 0,
	};

	// For each box, put it in the best point possible.
	boxes.forEach((box) => {
		handleBox(box, pp, container, solutionBoxes, data, retryList, false);
	});

	// For each box which is not put in the solution, try and put it again.
	retryList.forEach((box) => {
		handleBox(box, pp, container, solutionBoxes, data, retryList, true);
	});

	data.orderScore = parseFloat(orderMetric(solutionBoxes, container));

	data.overallScore = parseFloat(
		overallMetric(boxes, container, data, isQuantity)
	);

	return [solutionBoxes, data];
};

const handleData = (boxes, container, isQuantity, isQuality) => {
	//TODO : change 5000 to 15000
	const algorithmTime = isQuality ? 60000 : 5000; // miliseconds

	const initBoxes = boxes.map((box) => {
		return initBox(box);
	});

	// Sort the boxes by descending order by the "order" property.
	initBoxes.sort((a, b) => (a.order > b.order ? -1 : 1));
	return [initBoxes, container, isQuantity, algorithmTime];
};

const getSolutions = (algorithmTime, boxes, container, isQuantity) => {
	let solutionList = {};
	let counter = 0;
	const endTime = Date.now() + algorithmTime;

	while (Date.now() < endTime) {
		let boxesCopy = [...boxes];
		// For non-deterministic algorithm - rotating and perturbating the boxes.
		boxesCopy = rotation(boxesCopy);
		boxesCopy = perturbation(boxesCopy);
		
		let solution = constructivePacking(boxesCopy, container, isQuantity);

		if (solution === null) {
			continue;
		}

		let [boxesInSolution, data] = solution;

		if (boxesInSolution !== null && data !== null) {
			let counterString = counter.toString();
			solutionList[counterString] = {
				name: "solution " + counterString,
				id: counter,
				boxes: boxesInSolution.map((box) => {
					return getBox(box);
				}),
				data: data,
			};
			counter += 1;
		}

		if (counter === ALGOIRTHM_MAX_ITERATIONS) {
			break;
		}
	}
	return solutionList;
};

const sortByPreference = (solutionList, isQuantity) => {
	if (isQuantity) {
		solutionList = Object.values(solutionList)
			.sort((a, b) => b.data.numberOfItems - a.data.numberOfItems)
			.slice(0, 50);
		solutionList = solutionList
			.sort((a, b) => b.data.capacity - a.data.capacity)
			.slice(0, 25);
		solutionList = solutionList
			.sort((a, b) => b.data.orderScore - a.data.orderScore)
			.slice(0, 10);
	} else {
		solutionList = Object.values(solutionList)
			.sort((a, b) => b.data.orderScore - a.data.orderScore)
			.slice(0, 20);
		solutionList = solutionList
			.sort((a, b) => b.data.numberOfItems - a.data.numberOfItems)
			.slice(0, 15);
		solutionList = solutionList
			.sort((a, b) => b.data.capacity - a.data.capacity)
			.slice(0, 10);
	}
	solutionList = solutionList.sort(
		(a, b) => b.data.overallScore - a.data.overallScore
	);
	return solutionList;
};

const dictSolutionsFromList = (solutionList) => {
	let solutionDict = {};
	for (let index = 0; index < solutionList.length; index++) {
		let indexString = index.toString();
		solutionDict[indexString] = solutionList[index];
	}
	return solutionDict;
};

export const algo = (
	clientBoxes,
	clientContainer,
	clientIsQuantity,
	clientIsQuality
) => {
	const [boxes, container, isQuantity, algorithmTime] = handleData(
		clientBoxes,
		clientContainer,
		clientIsQuantity,
		clientIsQuality
	);

	let solutionList = getSolutions(
		algorithmTime,
		boxes,
		container,
		isQuantity
	);

	solutionList = sortByPreference(solutionList, isQuantity);

	solutionList = solutionList.map((solution, index) => {
		return { ...solution, name: `solution ${index + 1}` };
	});

	return solutionList

};
