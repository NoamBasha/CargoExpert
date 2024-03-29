import { getBoxRotatedSize, getValidRotations } from "./box.js";
import { Rotation } from "./utils.js";

const rotateEachBox = (boxes, container) => {
    return boxes.map((box) => {
        const validRotations = getValidRotations(box, container);
        const numOfRotations = Object.values(validRotations).length;
        const rotation =
            validRotations[Math.floor(Math.random() * numOfRotations)];
        return { ...box, rotation: rotation };
    });
};

const rotateSubset = (boxes, container) => {
    /*
    For each subset of items sharing all dimensions,
    randomly pick one of the orientations that with equal probability.
    */

    // Group boxes by size
    const sameSizeDict = boxes.reduce((dict, box) => {
        const boxSizeString = JSON.stringify(getBoxRotatedSize(box));
        if (!dict[boxSizeString]) {
            dict[boxSizeString] = [];
        }
        dict[boxSizeString].push(box);
        return dict;
    }, {});

    // Generate random rotation for each size
    const rotations = Object.keys(sameSizeDict).reduce((acc, size) => {
        if (!acc[size]) {
            const validRotations = getValidRotations({ size }, container);
            const numOfRotations = Object.values(validRotations).length;
            const rotationIndex = Math.floor(Math.random() * numOfRotations);
            const rotation = validRotations[rotationIndex];
            acc[size] = rotation;
        }
        return acc;
    }, {});

    // Assign rotation to boxes
    return boxes.map((box) => {
        const boxSizeString = JSON.stringify(getBoxRotatedSize(box));
        const rotation = rotations[boxSizeString];
        return { ...box, rotation: rotation };
    });
};

export const rotation = (boxes, container) => {
    // Rotate boxes individually or by subset with equal probability
    if (boxes.length) {
        return Math.random() < 0.5
            ? rotateEachBox(boxes, container)
            : rotateSubset(boxes, container);
    } else {
        return [];
    }
};

const volumePerturb = (b1, b2) => {
    if (
        0.7 <= b1.volume / b2.volume &&
        b1.volume / b2.volume <= 1.3 &&
        Math.random() > 0.5
    ) {
        return true;
    }
    return false;
};

export const perturbation = (boxes) => {
    if (boxes.length <= 1) {
        return boxes;
    }
    for (let i = 0; i < boxes.length - 1; i++) {
        if (volumePerturb(boxes[i], boxes[i + 1])) {
            [boxes[i], boxes[i + 1]] = [boxes[i + 1], boxes[i]];
        }
    }

    return boxes;
};
