class Rotation:
    WHL = 0
    LHW = 1
    HLW = 2
    LWH = 3
    WLH = 4
    HWL = 5

def init_box(box):
    box_size = box['width'] * box['height'] * box['length']
    return {
        **box,
        'volume': box_size,
        'rotation': Rotation.WHL,
        'center': {
            'x': 0,
            'y': 0,
            'z': 0,
        },
        'FLB': {
            'x': 0,
            'y': 0,
            'z': 0,
        },
    }

def get_size(box):
    box_rotation = box['rotation']
    if box_rotation == Rotation.WHL:
        return {
            'width': box['width'],
            'height': box['height'],
            'length': box['length'],
        }
    elif box_rotation == Rotation.LHW:
        return {
            'width': box['length'],
            'height': box['height'],
            'length': box['width'],
        }
    elif box_rotation == Rotation.HLW:
        return {
            'width': box['height'],
            'height': box['length'],
            'length': box['width'],
        }
    elif box_rotation == Rotation.LWH:
        return {
            'width': box['length'],
            'height': box['width'],
            'length': box['height'],
        }
    elif box_rotation == Rotation.WLH:
        return {
            'width': box['width'],
            'height': box['length'],
            'length': box['height'],
        }
    elif box_rotation == Rotation.HWL:
        return {
            'width': box['height'],
            'height': box['width'],
            'length': box['length'],
        }

def set_position(box, p):
    # set center, FLB and isIn
    box_size = get_size(box)

    if p[3] == 1:
        box['FLB'] = {
            'x': p[0],
            'y': p[1],
            'z': p[2],
        }
    else:
        box['FLB'] = {
            'x': p[0] - box_size['width'],
            'y': p[1],
            'z': p[2],
        }

    box['center'] = {
        'x': box['FLB']['x'] + box_size['width'] / 2,
        'y': box['FLB']['y'] + box_size['height'] / 2,
        'z': box['FLB']['z'] + box_size['length'] / 2,
    }
    box['isIn'] = 1

def unset_position(box):
    box['FLB'] = {
        'x': 0,
        'y': 0,
        'z': 0,
    }

    box['center'] = {
        'x': 0,
        'y': 0,
        'z': 0,
    }
    box['isIn'] = 0

# Returns the box with the correct size.
# def get_box(box):
#     return {
#         **box,
#         'size': list(get_size(box).values()),
#         'position': list(box['center'].values()),
#         'text': box['type'],
#     }

def get_box_object(box):
    return {
        "id": box["id"],
        "order": box["order"],
        "size": list(get_size(box).values()),
        "position": list(box["center"].values()),
        "color": box["color"],
        "text": box["type"],
        "isIn":box["isIn"]
    }


def get_box(box):
    initial = f'"id": {box["id"].__str__()}, "order": {box["order"].__str__()}, "size": {list(get_size(box).values()).__str__()},"position": {list(box["center"].values()).__str__()}, "color": \"{box["color"]}\","text": \"{box["type"]}\","isIn": \"{box["isIn"].__str__()}\"'
    return '{' + initial + '}'
