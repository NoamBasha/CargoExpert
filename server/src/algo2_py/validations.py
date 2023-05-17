from box import get_size 

def is_box_out_of_bounds(box, container):
    box_size = get_size(box)
    x_condition = box['center']['x'] + 0.5 * box_size['width'] > container['width'] or box['center']['x'] - 0.5 * box_size['width'] < 0
    y_condition = box['center']['y'] + 0.5 * box_size['height'] > container['height'] or box['center']['y'] - 0.5 * box_size['height'] < 0
    z_condition = box['center']['z'] + 0.5 * box_size['length'] > container['length'] or box['center']['z'] - 0.5 * box_size['length'] < 0
    return x_condition or y_condition or z_condition

def is_two_boxes_overlapping(box1, box2):
    box1_size = get_size(box1)
    box2_size = get_size(box2)

    box1_x_min = box1['center']['x'] - box1_size['width'] / 2
    box1_x_max = box1['center']['x'] + box1_size['width'] / 2
    box2_x_min = box2['center']['x'] - box2_size['width'] / 2
    box2_x_max = box2['center']['x'] + box2_size['width'] / 2

    # Check if boxes are separated along x axis
    if box1_x_max <= box2_x_min or box2_x_max <= box1_x_min:
        return False

    box1_y_min = box1['center']['y'] - box1_size['height'] / 2
    box1_y_max = box1['center']['y'] + box1_size['height'] / 2
    box2_y_min = box2['center']['y'] - box2_size['height'] / 2
    box2_y_max = box2['center']['y'] + box2_size['height'] / 2

    if box1_y_max <= box2_y_min or box2_y_max <= box1_y_min:
        return False

    box1_z_min = box1['center']['z'] - box1_size['length'] / 2
    box1_z_max = box1['center']['z'] + box1_size['length'] / 2
    box2_z_min = box2['center']['z'] - box2_size['length'] / 2
    box2_z_max = box2['center']['z'] + box2_size['length'] / 2

    if box1_z_max <= box2_z_min or box2_z_max <= box1_z_min:
        return False

    # If boxes are not separated along any axis, they must be overlapping
    return True

def is_box_overlapping(box, boxes):
    for i in range(len(boxes)):
        if is_two_boxes_overlapping(box, boxes[i]):
            return True
    return False

def is_boxes_hovering(in_boxes):
    def get_xs(box, other_box):
        box_size = get_size(box)
        other_box_size = get_size(other_box)
        box_min = box['FLB']['x']
        box_max = box['FLB']['x'] + box_size['width']
        other_box_min = other_box['FLB']['x']
        other_box_max = other_box['FLB']['x'] + other_box_size['width']

        # Check if boxes are separated along x axis
        if box_max <= other_box_min or other_box_max <= box_min:
            return 0

        if box_min <= other_box_min:
            min_val = other_box_min
        else:
            min_val = box_min

        if box_max >= other_box_max:
            max_val = other_box_max
        else:
            max_val = box_max

        return max_val - min_val

    def get_zs(box, other_box):
        box_size = get_size(box)
        other_box_size = get_size(other_box)
        box_min = box['FLB']['z']
        box_max = box['FLB']['z'] + box_size['length']
        other_box_min = other_box['FLB']['z']
        other_box_max = other_box['FLB']['z'] + other_box_size['length']

        # Check if boxes are separated along z axis
        if box_max <= other_box_min or other_box_max <= box_min:
            return 0

        if box_min <= other_box_min:
            min_val = other_box_min
        else:
            min_val = box_min

        if box_max >= other_box_max:
            max_val = other_box_max
        else:
            max_val = box_max

        return max_val - min_val

    def get_coverage(box, other_box):
        other_box_size = get_size(other_box)
        if box['FLB']['y'] != other_box['FLB']['y'] + other_box_size['height']:
            return 0

        x_intersection = get_xs(box, other_box)
        z_intersection = get_zs(box, other_box)

        return x_intersection * z_intersection

    for i in range(len(in_boxes)):
        box = in_boxes[i]
        box_size = get_size(box)
        if box['FLB']['y'] == 0:
            continue
        overall_coverage = 0
        area = box_size['width'] * box_size['length']
        for j in range(len(in_boxes)):
            if j == i:
                continue
            other_box = in_boxes[j]
            current_coverage = get_coverage(box, other_box)
            overall_coverage += current_coverage
        if overall_coverage != area:
            return True
    return False

def validate_boxes_location(box, boxes, container):
    boxesWithBox = boxes + [box]
    if (
        is_box_out_of_bounds(box, container) or
        is_box_overlapping(box, boxes) or
        is_boxes_hovering(boxesWithBox)
    ):
        return False
    return True
