import copy
import sys
import json
import random
from box import Box, Rotation
from container import Container

NUMBER_OF_ITERATIONS = 5
"""
the structure of the file is:
contWidth, contHeight, contLength, order, type, width, height, length, priority ,taxabilty

box's width should be parallel to container's width before we apply any rotation.
the same goes for height and length.
"""

"""pseudo code:
RCH(N, boxes, container, pp):
    for itertaion 1 to N:
        sort boxes by decreasing order (i.e., by the value order).
        
        choose perturbation randomly by these options:
        1a. for each box choose randomly orientation.
        1b. for a subset of boxes with similar dimensions choose randomly a feasable orientation

        choose perturbation randomly by these options:
        2a. for each 2 boxes (b1,b2) in a row if (volume b1) / (volume b2) in [0.7,1.3]
            then switch the boxes in 50 %.
        2b. for each 2 boxes (b1,b2) in a row if (prop b1) / (prop b2) in [start, end]
            then switch the boxes in 50 %.

       constructivePacking(boxes, container, pp)


constructivePacking(boxes, container, pp):
     retry, solution_boxes = [] , []
     for each box:
        bestP = none
        best_surface = -1
        for each point in pp:
            cur_surface = checkfeasable(box, point, solution_boxes, container).
            bestP, best_surface = get_best_point(bestP, point, best_surface, cur_surface)
            
        if bestP is not None:
            box.position = bestP
            solution_boxes.append(box)
            remove bestP from pp
            updatePP(pp, bestP, box, solution_boxes, container)
        else:
            add box to rerty.
        
    for each box in retry:
        bestP = none
        for each point in pp:
            if point is feasable and better than bestP:
                bestP = point
        
        if bestP is not None:
            place box in position bestP.
            remove bestP from pp.
            remove box from retry.
            generate new points and add to pp.

checkfeasable(box, point, solution_boxes, container):
    need to check 3 things:
        1. out of bounds.
        2. overlapping with other boxes
        3. surface area of box.
    
    

    return the surface area of box.

(bestP, point, best_surface, cur_surface):
    if cur_surface > best_surface:
        return point, cur_surface
    
    if cur_surface == best_surface:
        if bestP.z > point.z:
            return point, cur_surface
    return bestP, best_surface

updatePP(pp, pointbox, solution_boxes, container):
    "need to check if box.x or box.z are smaller than the box below"

    # the y coordinate can always be added if lower then y of container
    if box.y + box.height < container.y:
        pp.append([box.z, box.x, box.y + box.height])

    for each box in boxes:
        if box.FLB.x == point.x
            and box.FLB.z == point.z
            and box.FLB.y + box.height == point.y:

comparepoints(point1, point2):
"""


def rotate_each_box(boxes: list[Box]) -> None:
    for b in boxes:
        b.rotation = random.choice(list(Rotation))


def rotate_subset(boxes: list[Box]) -> None:
    d = {}
    for b in boxes:
        if b.size in d.keys():
            d[b.size].append(b)
        else:
            d[b.size] = [b]

    for k in d.keys():
        rotation = random.choice(list(Rotation))
        for b in d[k]:
            b.rotation = rotation


def rotation(boxes: list[Box]) -> None:
    if boxes:
        chosen_rotation = random.choice([rotate_each_box, rotate_subset])
        chosen_rotation(boxes)


def volume_perturb(b1: Box, b2: Box):
    """return True if the division gap is less than 0.3 in 50% of cases"""
    if 0.7 <= (b1.volume/b2.volume) <= 1.3 and random.randint(0, 1) > 0.5:
        return True
    return False


def perturbation(boxes: list[Box]):
    """perturb the sorted list using one perturbation option randomly"""
    if not boxes:
        return None

    if len(boxes) == 1:
        return boxes

    options = [volume_perturb]
    chosen_perturb = random.choice(options)
    for i, b1 in enumerate(boxes[:-1]):
        if chosen_perturb(b1, boxes[i+1]):
            boxes[i], boxes[i+1] = boxes[i+1], boxes[i]


def constructive_packing(boxes: list[Box], container: Container) -> list[Box]:
    # each point has x,y,z values. In addition, it holds the direction it came from - 1 for left and -1 for right.
    pp = set([(0, 0, 0, 1), (container.size[0] - 1, 0, 0, -1)])
    retry_list = []
    boxes_in_solution = []
    solution_data = {"number_of_items": 0, "capacity": 0, }

    for b in boxes:
        best_point = None
        best_score = (0, 0)
        # to find the best point we need to know what corner of the box is placed there
        for p in pp:
            score = container.get_score(b, p)
            if score > best_score:
                best_point = p
                best_score = score
        if best_point:
            container.place(b, best_point)
            container.update(b, best_point, pp)
            boxes_in_solution.append(b)
            #print(f"{b} insreted")
            solution_data['number_of_items'] += 1
            solution_data['capacity'] += b.volume
        else:
            retry_list.append(b)

    for b in retry_list:
        best_point = None
        best_score = (0, 0)
        for p in pp:
            score = container.get_score(b, p)
            if score > best_score:
                best_point = p
                best_score = score
        if best_point:
            container.place(b, best_point)
            container.update(b, best_point, pp)
            boxes_in_solution.append(b)
            #print(f"{b} insreted")
            solution_data['number_of_items'] += 1
            solution_data['capacity'] += b.volume

        # if we know all boxes must be in container, then we can stop here
        else:
            #print(b, pp)
            return None

    return boxes_in_solution, solution_data


def algo():
    # every key in json is a string in python dict.
    obj = json.loads(sys.argv[1])
    # obj = json.loads('{"container":{"width":6,"height":1,"length":2},"boxes":[{"order":1,"type":"Box1","width":2,"height":1,"length":2},{"order":2,"type":"Box2","width":2,"height":1,"length":2},{"order":3,"type":"Box3","width":2,"height":1,"length":2}]}')

    container = Container(obj['container']['width'],
                          obj['container']['height'],
                          obj['container']['length'])

    boxes = []

    for b in obj['boxes']:
        p = b['priority'] if b.get('priority', None) else 0
        t = b['taxability'] if b.get('taxability', None) else 0
        boxes.append(Box(b['order'], b['type'], b['width'],
                         b['height'], b['length'], p, t,weigth='0', color=b['color']))

    boxes = sorted(boxes, key=lambda x: x.order)

    solution_list = {}
    counter = 0
    for _ in range(NUMBER_OF_ITERATIONS):
        copy_boxes = copy.deepcopy(boxes)
        container.start_packing()

        rotation(copy_boxes)
        perturbation(copy_boxes)

        boxes_in_solution, solution_data = constructive_packing(copy_boxes, container)
        if boxes_in_solution is not None and solution_data is not None :
            counter_string = f'{counter}'
            solution_list[counter_string] = {"boxes": boxes_in_solution, "solution_data": solution_data}
            counter += 1

    return solution_list


print(algo())
