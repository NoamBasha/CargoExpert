import { Rotation } from "./utils.js";

export const initBox = (box) => {
	return {
		...box,
		volume: box.size.width * box.size.height * box.size.length,
		rotation: Rotation.WHL,
		center: {
			x: 0,
			y: 0,
			z: 0,
		},
		FLB: {
			x: 0,
			y: 0,
			z: 0,
		},
	};
};

export const getBoxRotatedSize = (box) => {
	switch (box.rotation) {
		case Rotation.WHL:
			return {
			width: box.size.width,
			height: box.size.height,
			length: box.size.length,
		};
		case Rotation.LHW:
			return {
				width: box.size.length,
				height: box.size.height,
				length: box.size.width,
			};
		case Rotation.HLW:		
			return {
				width: box.size.height,
				height: box.size.length,
				length: box.size.width,
			};
		case Rotation.LWH:		
			return {
				width: box.size.length,
				height: box.size.width,
				length: box.size.height,
			};
		case Rotation.WLH:		
			return {
				width: box.size.width,
				height: box.size.length,
				length: box.size.height,
			};
		case Rotation.HWL:		
			return {
				width: box.size.height,
				height: box.size.width,
				length: box.size.length,
			};
	}
};

export const setPosition = (box, p) => {
	// set center, FLB and isIn
	const boxSize = getBoxRotatedSize(box);

	if (p.dir === 1) {
		box.FLB = {
			x: p.x,
			y: p.y,
			z: p.z,
		};
	} else {
		box.FLB = {
			x: p.x - boxSize.width,
			y: p.y,
			z: p.z,
		};
	}

	box.center = {
		x: box.FLB.x + boxSize.width / 2,
		y: box.FLB.y + boxSize.height / 2,
		z: box.FLB.z + boxSize.length / 2,
	};
	box.isIn = true;
};

export const unsetPosition = (box) => {
	box.FLB = {
		x: 0,
		y: 0,
		z: 0,
	};

	box.center = {
		x: 0,
		y: 0,
		z: 0,
	};
	box.isIn = false;
};

// Returns the box with the correct size.
export const getBox = (box) => {
	return {
		...box,
		position: box.center,
	};
};
