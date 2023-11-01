import { setPosition, unsetPosition, getBoxRotatedSize } from "./box.js";
import { validateBoxesLocation } from "./validations.js";

export const getScore = (box, p, boxes, container) => {
	setPosition(box, p);

	const isValid = validateBoxesLocation(box, boxes, container);

	unsetPosition(box, p);

	if (!isValid) {
		return [0, 0];
	}

	// Score calculation based on distance between FLB and container.
	const scoreZ = container.length - p.z;
	const scoreY = container.height - p.y;

	return [scoreZ, scoreY];
};

export const updatePps = (box, p, pp, container) => {
	pp.delete(p);

	const boxSize = getBoxRotatedSize(box);

	if (boxSize.height + p.y < container.height) {
		pp.add({
			...p,
			y: p.y + boxSize.height,
		});
	}

	if (p.dir == 1) {
		if (p.x + boxSize.width < container.width) {
			pp.add({
				...p,
				x: p.x + boxSize.width,
			});
		}
		if (p.z + boxSize.length < container.length) {
			pp.add({
				...p,
				z: p.z + boxSize.length,
			});
		}
	} else {
		if (p.x - boxSize.width > 0) {
			pp.add({
				...p,
				x: p.x - boxSize.width,
			});
		}
		if (p.z + boxSize.length < container.length) {
			pp.add({
				...p,
				z: p.z + boxSize.length,
			});
		}
	}
};
