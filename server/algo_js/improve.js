const { Rotation } = require("./boxMotion.js");

const { getSize } = require("./box.js");
const { updatePps } = require("./container.js");
const { rotation, perturbation } = require("./boxMotion.js");

const { orderMetric, overallMetric } = require("./metrics.js");

const { handleBox } = require("./algo.js");

const improve_packing = (inBoxes, outBoxes, container) => {
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

	// Finding pps from in_boxes.
	inBoxes.forEach((box) => {
		// Placing the box in it right position
		let pLeft = {
			...box.FLB,
			dir: 1,
		};
		let pRight = {
			...box.FLB,
			dir: -1,
		};
		// Updating all possible pps from this box
		pp.add(pLeft);
		updatePps(box, pLeft, pp, container);
		pp.add(pRight);
		updatePps(box, pRight, pp, container);
		solutionBoxes.push(box);
		solution_data["number_of_items"] += 1;
		solution_data["capacity"] += box.volume;
	});

	// Adding each boxes in out_boxes to the container
	outBoxes.forEach((box) => {
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

	const boxes = [...inBoxes, ...outBoxes];
	solution_data.order_score = orderMetric(solutionBoxes, container);
	solution_data.overall_score = overallMetric(
		boxes,
		container,
		solution_data,
		1
	);
	return [solutionBoxes, solution_data];
};

const initImproveBox = (box) => {
	return {
		...box,
		width: box.size[0],
		height: box.size[1],
		length: box.size[2],
		volume: box.width * box.height * box.length,
		rotation: Rotation.WHL,
		size: {
			width: box.size[0],
			height: box.size[1],
			length: box.size[2],
		},
		center: {
			x: box.position[0],
			y: box.position[1],
			z: box.position[2],
		},
		FLB: {
			x: box.position[0] - 0.5 * box.width,
			y: box.position[1] - 0.5 * box.height,
			z: box.position[2] - 0.5 * box.length,
		},
	};
};

// Returns the box with the correct size.
const getImproveBox = (box) => {
	return {
		...box,
		size: Object.values(getSize(box)),
		position: Object.values(box.center),
	};
};

const improve = (data) => {
	const numOfIterations = 1000;
	const container = data.container;
	let boxes = data.boxes;

	boxes = boxes.map((box) => {
		return initImproveBox(box);
	});

	// Splitting to two lists
	const inBoxes = boxes.filter((box) => {
		return box.isIn == 1;
	});
	const outBoxes = boxes.filter((box) => {
		return box.isIn == 0;
	});

	// Sort isIn's by y coordinate and z coordinate
	inBoxes.sort((box1, box2) => {
		if (box1.FLB.y === box2.FLB.y) {
			return box1.FLB.z - box2.FLB.z;
		}
		return box1.FLB.y - box2.FLB.y;
	});

	let solutionList = {};
	let counter = 0;
	for (let i = 0; i < numOfIterations; i++) {
		inBoxesCopy = [...inBoxes];
		outBoxesCopy = [...outBoxes];

		// For non-deterministic algorithm
		rotation(outBoxesCopy);
		perturbation(outBoxesCopy);

		let solution = improve_packing(inBoxesCopy, outBoxesCopy, container);
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
					return getImproveBox(box);
				}),
				solution_data: solution_data,
			};
			counter += 1;
		}
	}

	// TODO: reverse=True?
	return Object.values(solutionList).sort(
		(a, b) => b.solution_data.overall_score - a.solution_data.overall_score
	)[0];
};

module.exports = { improve };
