from box import set_position, unset_position, get_size
from validations import validate_boxes_location

def get_score(box, p, boxes, container):
    set_position(box, p)
    isValid = validate_boxes_location(box, boxes, container)
    unset_position(box)

    if not isValid:
        return [0, 0]

    # Score calculation based on distance between FLB and container.
    scoreZ = container['length'] - p[2]
    scoreY = container['height'] - p[1]

    return [scoreZ, scoreY]

def update_pps(box, p, pp, container):
    pp.remove(p)

    boxSize = get_size(box)

    if boxSize['height'] + p[1] < container['height']:
        pp.add((p[0], p[1] + boxSize['height'], p[2], p[3]))

    if p[3] == 1:
        if p[0] + boxSize["width"] < container["width"]:
            pp.add((p[0] + boxSize["width"], p[1], p[2], p[3])) # b_FRB

        if p[2] + boxSize["length"] < container["length"]:
            pp.add((p[0], p[1], p[2] + boxSize["length"], p[3])) # b_RLB
    else:
        if p[0] - boxSize["width"] > 0:
            pp.add((p[0] - boxSize["width"], p[1], p[2], p[3])) # b_FLB

        if p[2] + boxSize["length"] < container["length"]:
            pp.add((p[0], p[1], p[2] + boxSize["length"], p[3])) # b_RRB

