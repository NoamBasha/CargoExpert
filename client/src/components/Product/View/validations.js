// returns true if there is a box that is out of bounds
// return false if everything is ok
const isBoxesOutOfBounds = (inBoxes, container) => {
	if (!inBoxes || !container) {
		return true;
	}

	const isOutOfBounds = inBoxes.some((box) => {
		const x_condition =
			box.position.x + 0.5 * box.size.width > container.width ||
			box.position.x - 0.5 * box.size.width < 0;
		const y_condition =
			box.position.y + 0.5 * box.size.height > container.height ||
			box.position.y - 0.5 * box.size.height < 0;

		const z_condition =
			box.position.z + 0.5 * box.size.length > container.length ||
			box.position.z - 0.5 * box.size.length < 0;
		return x_condition || y_condition || z_condition;
	});
	return isOutOfBounds;
};

// return true if two boxes are overlapping
const isTwoBoxesOverLapping = (box1, box2) => {
	if (!box1 || !box2) {
		return true;
	}

	const box1xMin = box1.position.x - box1.size.width / 2;
	const box1xMax = box1.position.x + box1.size.width / 2;
	const box2xMin = box2.position.x - box2.size.width / 2;
	const box2xMax = box2.position.x + box2.size.width / 2;

	// Check if boxes are separated along x axis
	if (box1xMax <= box2xMin || box2xMax <= box1xMin) {
		return false;
	}

	const box1yMin = box1.position.y - box1.size.height / 2;
	const box1yMax = box1.position.y + box1.size.height / 2;
	const box2yMin = box2.position.y - box2.size.height / 2;
	const box2yMax = box2.position.y + box2.size.height / 2;

	if (box1yMax <= box2yMin || box2yMax <= box1yMin) {
		return false;
	}

	const box1zMin = box1.position.z - box1.size.length / 2;
	const box1zMax = box1.position.z + box1.size.length / 2;
	const box2zMin = box2.position.z - box2.size.length / 2;
	const box2zMax = box2.position.z + box2.size.length / 2;

	if (box1zMax <= box2zMin || box2zMax <= box1zMin) {
		return false;
	}

	// If boxes are not separated along any axis, they must be overlapping
	return true;
};

// returns true if everything is ok
const isBoxesOverlapping = (inBoxes) => {
	for (let i = 0; i < inBoxes.length; i++) {
		for (let j = i + 1; j < inBoxes.length; j++) {
			if (isTwoBoxesOverLapping(inBoxes[i], inBoxes[j])) {
				return true;
			}
		}
	}
	return false;
};

const isBoxesHovering = (inBoxes) => {
	const getXs = (box, otherBox) => {
		const boxMin = box.flb.x;
		const boxMax = box.flb.x + box.size.width;
		const otherBoxMin = otherBox.flb.x;
		const otherBoxMax = otherBox.flb.x + otherBox.size.width;

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

	const getZs = (box, otherBox) => {
		const boxMin = box.flb.z;
		const boxMax = box.flb.z + box.size.length;
		const otherBoxMin = otherBox.flb.z;
		const otherBoxMax = otherBox.flb.z + otherBox.size.length;

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

	const getCoverage = (box, otherBox) => {
		if (box.flb.y !== otherBox.flb.y + otherBox.size.height) {
			return 0;
		}

		let x_intersection = getXs(box, otherBox);
		let z_intersection = getZs(box, otherBox);

		return x_intersection * z_intersection;
	};

	const boxes_with_flb = inBoxes.map((box) => {
		let flb = {
			x: box.position.x - box.size.width / 2,
			y: box.position.y - box.size.height / 2,
			z: box.position.z - box.size.length / 2,
		};
		return { ...box, flb: flb };
	});

	for (let i = 0; i < boxes_with_flb.length; i++) {
		const box = boxes_with_flb[i];
		if (box.flb.y === 0) {
			continue;
		}
		let overall_coverage = 0;
		const area = box.size.width * box.size.length;
		for (let j = 0; j < boxes_with_flb.length; j++) {
			if (j === i) {
				continue;
			}
			const otherBox = boxes_with_flb[j];
			let current_coverage = getCoverage(box, otherBox);
			overall_coverage += current_coverage;
		}
		if (overall_coverage !== area) {
			return true;
		}
	}
	return false;
};

module.exports = {
	isBoxesOutOfBounds,
	isBoxesOverlapping,
	isTwoBoxesOverLapping,
	isBoxesHovering,
};
