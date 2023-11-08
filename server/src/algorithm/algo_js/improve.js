import { getBoxRotatedSize } from "./box.js";
import { updatePps } from "./container.js";
import { rotation, perturbation } from "./boxMotion.js";
import { orderMetric, overallMetric } from "./metrics.js";
import { handleBox } from "./algo.js";

// TODO: change back to 10000
const IMPROVE_TIME = 3000;
const IMPROVE_MAX_ITERATIONS = 1000000;

const improvePacking = (inBoxes, outBoxes, container) => {
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

    let solutionData = {
        numberOfItems: 0,
        capacity: 0,
        orderScore: 0,
        overallScore: 0,
    };

    // Finding pps from inBoxes.
    inBoxes.forEach((box) => {
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
        solutionData["numberOfItems"] += 1;
        solutionData["capacity"] += box.volume;
    });

    // Adding each box in outBoxes to the container
    outBoxes.forEach((box) => {
        handleBox(
            box,
            pp,
            container,
            solutionBoxes,
            solutionData,
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
            solutionData,
            retryList,
            true
        );
    });

    const boxes = [...inBoxes, ...outBoxes];

    solutionData.orderScore = parseFloat(orderMetric(solutionBoxes, container));
    solutionData.overallScore = parseFloat(
        overallMetric(boxes, container, solutionData, true)
    );
    return [solutionBoxes, solutionData];
};

const initImproveBox = (box) => {
    return {
        ...box,
        // width: box.size.width,
        // height: box.size.height,
        // length: box.size.length,
        volume: box.size.width * box.size.height * box.size.length,
        rotation: box.rotation,
        center: box.position,
    };
};

// Returns the box with the correct size.
const getImproveBox = (box) => {
    return {
        ...box,
        position: box.center,
    };
};

export const improve = (boxes, container, name, id) => {
    boxes = boxes.map((box) => {
        return initImproveBox(box);
    });

    boxes = boxes.map((box) => {
        const rotatedSize = getBoxRotatedSize(box);
        return {
            ...box,
            FLB: {
                x: box.position.x - 0.5 * rotatedSize.width,
                y: box.position.y - 0.5 * rotatedSize.height,
                z: box.position.z - 0.5 * rotatedSize.length,
            },
        };
    });

    // Splitting to two lists
    const inBoxes = boxes.filter((box) => {
        return box.isIn === true;
    });

    const outBoxes = boxes.filter((box) => {
        return box.isIn === false;
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

    const endTime = Date.now() + IMPROVE_TIME;
    while (Date.now() < endTime) {
        let inBoxesCopy = [...inBoxes];
        let outBoxesCopy = [...outBoxes];

        outBoxesCopy = rotation(outBoxesCopy, container);
        outBoxesCopy = perturbation(outBoxesCopy);

        let solution = improvePacking(inBoxesCopy, outBoxesCopy, container);
        if (solution === null) {
            continue;
        }

        let [boxesInSolution, solutionData] = solution;
        if (boxesInSolution !== null && solutionData !== null) {
            let counterString = counter.toString();
            solutionList[counterString] = {
                _id: id,
                name: name,
                // id: counter,
                boxes: boxesInSolution.map((box) => {
                    return getImproveBox(box);
                }),
                data: solutionData,
            };
            counter += 1;
        }
        if (counter === IMPROVE_MAX_ITERATIONS) {
            break;
        }
    }

    // The best solution is the one with the most boxes in it.
    const bestSolution = Object.values(solutionList).sort(
        (a, b) => b.data.numberOfItems - a.data.numberOfItems
    )[0];

    return bestSolution;
};
