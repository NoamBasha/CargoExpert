export const Rotation = {
    WHL: 0,
    LHW: 1,
    HLW: 2,
    LWH: 3,
    WLH: 4,
    HWL: 5,
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
        default:
            return box.size;
    }
};

export const getRotatedSizeBoxes = (boxes) => {
    return boxes.map((box) => {
        return {
            ...box,
            size: getBoxRotatedSize(box),
        };
    });
};
