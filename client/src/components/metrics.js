const numOfItemsMetric = (solutionBoxes) => {
	const inBoxes = solutionBoxes.filter((box) => box.isIn);
	return inBoxes.length;
};

const volumeMetric = (solutionBoxes) => {
	let volumes_sum = 0;
	const inBoxes = solutionBoxes.filter((box) => box.isIn);
	for (const volume of inBoxes.map(
		(box) => box.size[0] * box.size[1] * box.size[2]
	)) {
		volumes_sum += volume;
	}
	return volumes_sum;
};

const orderMetric = (solutionBoxes, container) => {
	const inBoxes = solutionBoxes.filter((box) => box.isIn);

	if (inBoxes.length === 0) {
		return 0.0;
	}

	const orderList = normalize(inBoxes.map((box) => box.order));
	const zList = normalize(
		inBoxes.map(
			(box) => container.length - (box.position[2] - 0.5 * box.size[2])
		)
	);

	let score = 0;
	for (let i = 0; i < inBoxes.length; i++) {
		const order = orderList[i];
		const z = zList[i];

		const zOrderDistance = Math.abs(order - z);
		const zOrderDistanceSquared = zOrderDistance ** 2;
		const zOrderDistanceQuaded = zOrderDistanceSquared ** 2;

		if (zOrderDistance < 0.2) {
			score += zOrderDistanceQuaded;
		} else {
			score += zOrderDistanceSquared;
		}
	}

	let finalScore = (1000 * score) / inBoxes.length;
	if (finalScore > 100) {
		finalScore = 100.0;
	}
	if (finalScore < 0) {
		finalScore = 0.0;
	}

	return (100 - finalScore).toFixed(2);
};

const normalize = (numbers) => {
	const maxNumber = Math.max(...numbers);
	const mimNumber = Math.min(...numbers);
	if (maxNumber === mimNumber) {
		return numbers.map(() => 1);
	}
	const normalized = numbers.map(
		(number) => (number - mimNumber) / (maxNumber - mimNumber)
	);
	return normalized;
};

const overallMetric = (projectBoxes, container, solution_data, isQuantity) => {
	const containerVolume = container[0] * container[1] * container[2];
	const numScore = solution_data.number_of_items / projectBoxes.length;
	const capScore = solution_data.capacity / containerVolume;
	const ordScore = solution_data.order_score / 100;

	let score = 0;
	if (!isQuantity) {
		score = 0.3 * numScore + 0.2 * capScore + 0.5 * ordScore;
	} else {
		score = 0.5 * numScore + 0.2 * capScore + 0.3 * ordScore;
	}

	return (score * 100).toFixed(2);
};

module.exports = { numOfItemsMetric, volumeMetric, orderMetric, overallMetric };
