export const Rotation = {
	WHL: 0,
	LHW: 1,
	HLW: 2,
	LWH: 3,
	WLH: 4,
	HWL: 5,
};

export const getBoxRotatedSize = (box) => {
	let rotatedSize = box.size;
	if (box.rotation === Rotation.WHL) {
		rotatedSize = {
			width: box.size.width,
			height: box.size.height,
			length: box.size.length,
		};
	} else if (box.rotation === Rotation.LHW) {
		rotatedSize = {
			width: box.size.length,
			height: box.size.height,
			length: box.size.width,
		};
	} else if (box.rotation === Rotation.HLW) {
		rotatedSize = {
			width: box.size.height,
			height: box.size.length,
			length: box.size.width,
		};
	} else if (box.rotation === Rotation.LWH) {
		rotatedSize = {
			width: box.size.length,
			height: box.size.width,
			length: box.size.height,
		};
	} else if (box.rotation === Rotation.WLH) {
		rotatedSize = {
			width: box.size.width,
			height: box.size.length,
			length: box.size.height,
		};
	} else if (box.rotation === Rotation.HWL) {
		rotatedSize = {
			width: box.size.height,
			height: box.size.width,
			length: box.size.length,
		};
	}
	return rotatedSize;
};

export const getRotatedSizeBoxes = (boxes) => {
	return boxes.map((box) => {
		return {
			...box,
			size: getBoxRotatedSize(box),
		};
	});
};