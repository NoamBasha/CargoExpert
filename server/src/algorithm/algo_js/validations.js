import { getBoxRotatedSize } from "./box.js";

const isBoxOutOfBounds = (box, container) => {
	if (!box || !container) {
		return true;
	}

	// Box is out of bounds if one of its sides is out of the container sides.
	const boxSize = getBoxRotatedSize(box);
	const xCondiction =
		box.center.x + 0.5 * boxSize.width > container.width ||
		box.center.x - 0.5 * boxSize.width < 0;
	const yCondiction =
		box.center.y + 0.5 * boxSize.height > container.height ||
		box.center.y - 0.5 * boxSize.height < 0;
	const zCondiction =
		box.center.z + 0.5 * boxSize.length > container.length ||
		box.center.z - 0.5 * boxSize.length < 0;
	return xCondiction || yCondiction || zCondiction;
};

const isTwoBoxesOverLapping = (box1, box2) => {
	if (!box1 || !box2) {
		return true;
	}

	// Two boxes are overlapping iff the overlap in all three axes.
	const box1Size = getBoxRotatedSize(box1);
	const box2Size = getBoxRotatedSize(box2);

	const box1xMin = box1.center.x - box1Size.width / 2;
	const box1xMax = box1.center.x + box1Size.width / 2;
	const box2xMin = box2.center.x - box2Size.width / 2;
	const box2xMax = box2.center.x + box2Size.width / 2;

	// Check if boxes are separated along x axis
	if (box1xMax <= box2xMin || box2xMax <= box1xMin) {
		return false;
	}

	const box1yMin = box1.center.y - box1Size.height / 2;
	const box1yMax = box1.center.y + box1Size.height / 2;
	const box2yMin = box2.center.y - box2Size.height / 2;
	const box2yMax = box2.center.y + box2Size.height / 2;

	if (box1yMax <= box2yMin || box2yMax <= box1yMin) {
		return false;
	}

	const box1zMin = box1.center.z - box1Size.length / 2;
	const box1zMax = box1.center.z + box1Size.length / 2;
	const box2zMin = box2.center.z - box2Size.length / 2;
	const box2zMax = box2.center.z + box2Size.length / 2;

	if (box1zMax <= box2zMin || box2zMax <= box1zMin) {
		return false;
	}

	// If boxes are not separated along any axis, they must be overlapping
	return true;
};

const isBoxOverLapping = (box, boxes) => {
	for (let i = 0; i < boxes.length; i++) {
		if (isTwoBoxesOverLapping(box, boxes[i])) {
			return true;
		}
	}
	return false;
};

const isBoxesHovering = (inBoxes) => {
	// Getting the length of the intersection of both boxes on the x axis.
	const getXs = (box, otherBox) => {
		const boxSize = getBoxRotatedSize(box);
		const otherBoxSize = getBoxRotatedSize(otherBox);
		const boxMin = box.FLB.x;
		const boxMax = box.FLB.x + boxSize.width;
		const otherBoxMin = otherBox.FLB.x;
		const otherBoxMax = otherBox.FLB.x + otherBoxSize.width;

		// Check if boxes are separated along x axis
		if (boxMax <= otherBoxMin || otherBoxMax <= boxMin) {
			return 0;
		}

		let min;
		if (boxMin <= otherBoxMin) {
			min = otherBoxMin;
		} else {
			min = boxMin;
		}

		let max;
		if (boxMax >= otherBoxMax) {
			max = otherBoxMax;
		} else {
			max = boxMax;
		}
		return max - min;
	};

	// Getting the length of the intersection of both boxes on the z axis.
	const getZs = (box, otherBox) => {
		const boxSize = getBoxRotatedSize(box);
		const otherBoxSize = getBoxRotatedSize(otherBox);
		const boxMin = box.FLB.z;
		const boxMax = box.FLB.z + boxSize.length;
		const otherBoxMin = otherBox.FLB.z;
		const otherBoxMax = otherBox.FLB.z + otherBoxSize.length;

		// Check if boxes are separated along x axis
		if (boxMax <= otherBoxMin || otherBoxMax <= boxMin) {
			return 0;
		}

		let min;
		if (boxMin <= otherBoxMin) {
			min = otherBoxMin;
		} else {
			min = boxMin;
		}

		let max;
		if (boxMax >= otherBoxMax) {
			max = otherBoxMax;
		} else {
			max = boxMax;
		}
		return max - min;
	};

	// Returns the surface coverage of box by otherBox
	const getCoverage = (box, otherBox) => {
		const otherBoxSize = getBoxRotatedSize(otherBox);
		if (box.FLB.y !== otherBox.FLB.y + otherBoxSize.height) {
			return 0;
		}

		let xIntersection = getXs(box, otherBox);
		let zIntersection = getZs(box, otherBox);

		return xIntersection * zIntersection;
	};

	// For each box going over all of the other boxes and check if it is covered completely.
	for (let i = 0; i < inBoxes.length; i++) {
		const box = inBoxes[i];
		const boxSize = getBoxRotatedSize(box);
		if (box.FLB.y === 0) {
			continue;
		}
		let overallCoverage = 0;
		const area = boxSize.width * boxSize.length;
		for (let j = 0; j < inBoxes.length; j++) {
			if (j === i) {
				continue;
			}
			const otherBox = inBoxes[j];
			let currentCoverage = getCoverage(box, otherBox);
			overallCoverage += currentCoverage;
		}
		if (overallCoverage !== area) {
			return true;
		}
	}
	return false;
};

export const validateBoxesLocation = (box, boxes, container) => {
	const boxesWithBox = [...boxes, box];

	if (isBoxOutOfBounds(box, container) ||
		isBoxOverLapping(box, boxes) ||
		isBoxesHovering(boxesWithBox)) {
		return false;
	}
	return true;
};
