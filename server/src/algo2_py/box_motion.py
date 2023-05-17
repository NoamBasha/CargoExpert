from box import get_size
from enum import IntEnum
import random


class Rotation(IntEnum):
    WHL = 0
    LHW = 1
    HLW = 2
    LWH = 3
    WLH = 4
    HWL = 5


def rotate_each_box(boxes):
    numOfRotations = len(Rotation)
    rotationsList = list(Rotation)
    return [
        {**box, "rotation": random.choice(rotationsList)}
        for box in boxes
    ]


def rotate_subset(boxes):
    """
    For each subset of items sharing all dimensions,
    randomly pick one of the orientations that with equal probability.
    """

    # Group boxes by size
    sameSizeDict = {}
    for box in boxes:
        boxSizeString = str(get_size(box))
        if boxSizeString not in sameSizeDict:
            sameSizeDict[boxSizeString] = []
        sameSizeDict[boxSizeString].append(box)

    # Generate random rotation for each size
    numOfRotations = len(Rotation)
    rotationsList = list(Rotation)
    rotations = {
        size: random.choice(rotationsList)
        for size in sameSizeDict.keys()
    }

    # Assign rotation to boxes
    return [
        {**box, "rotation": rotations[str(get_size(box))]}
        for box in boxes
    ]


def rotation(boxes):
    # Rotate boxes individually or by subset with equal probability
    if len(boxes):
        return (
            rotate_each_box(boxes)
            if random.random() < 0.5
            else rotate_subset(boxes)
        )
    else:
        return []


def volume_perturb(b1, b2):
    if 0.7 <= b1["volume"] / b2["volume"] <= 1.3 and random.random() > 0.5:
        return True
    return False


def perturbation(boxes):
    if len(boxes) <= 1:
        return boxes
    for i in range(len(boxes) - 1):
        if volume_perturb(boxes[i], boxes[i + 1]):
            boxes[i], boxes[i + 1] = boxes[i + 1], boxes[i]

    return boxes
