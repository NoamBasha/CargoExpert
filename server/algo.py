import copy
import sys
import json
import random
from box import Box, Rotation
from container import Container

NUMBER_OF_ITERATIONS = 1000
"""
the structure of the file is:
contWidth, contHeight, contLength, order, type, width, height, length, priority ,taxabilty

box's width should be parallel to container's width before we apply any rotation.
the same goes for height and length.
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
    # return True if the division gap is less than 0.3 in 50% of cases
    if 0.7 <= (b1.volume/b2.volume) <= 1.3 and random.randint(0, 1) > 0.5:
        return True
    return False


def perturbation(boxes: list[Box]):
    # perturb the sorted list using one perturbation option randomly
    if len(boxes) <= 1:
        return boxes

    options = [volume_perturb]
    chosen_perturb = random.choice(options)
    for i, b1 in enumerate(boxes[:-1]):
        if chosen_perturb(b1, boxes[i+1]):
            boxes[i], boxes[i+1] = boxes[i+1], boxes[i]

def num_of_items_metric(solution_boxes: list[Box]):
    in_boxes = [box for box in solution_boxes if box.isIn]
    return len(in_boxes)

def volume_metric(solution_boxes: list[Box]):
    volume = 0
    in_boxes = [box for box in solution_boxes if box.isIn]
    for v in normalize([box.volume for box in in_boxes]):
        volume += v
    return volume

def order_metric(solution_boxes: list[Box], project_boxes: list[Box], container: Container):
    in_boxes = [box for box in solution_boxes if box.isIn]
    order_list = normalize([box.order for box in in_boxes])
    # z_list = normalize([(box.FLB[2] + box.get_size()[2]) / 2 for box in solution_boxes])
    z_list = normalize([container.size[2] - box.FLB[2] for box in in_boxes])
    # z_list = normalize([container.size[2] - ((box.FLB[2] + box.get_size()[2]) / 2) for box in solution_boxes])

    score = 0
    for order,z in zip(order_list,z_list):
        # maybe we should multiply by the score by a factor of something?
        if order < 0.5:
            score += 1000 * (abs(order - z))
        else:
            score += 10 * (abs(order - z))
    return round(score / len(in_boxes), 2)

def normalize(numbers):
    max_number = max(numbers)
    min_number = min(numbers)
    normalized = [(number - min_number) / (max_number - min_number) for number in numbers]
    return normalized

def overall_metric(solution_boxes: list[Box], project_boxes: list[Box], container: Container, solution_data, isOrder=False):
    num_score = solution_data["number_of_items"] / len(project_boxes)
    cap_score = solution_data["capacity"] / container.volume
    ord_score = solution_data["order_score"] / 100
    score = 0
    if isOrder:
        score = 0.3 * num_score + 0.2 * cap_score + 0.5 * (1 - ord_score)
    else:
        score = 0.5 * num_score + 0.2 * cap_score + 0.3 * (1 - ord_score)
    return round(score * 100, 2)

def constructive_packing(boxes: list[Box], container: Container) -> list[Box]:
    # each point has x,y,z values. In addition, it holds the direction it came from - 1 for left and -1 for right.
    pp = set([(0, 0, 0, 1), (container.size[0] - 1, 0, 0, -1)])
    retry_list = []
    solution_boxes = []
    solution_data = {"number_of_items": 0, "capacity": 0, "order_score": 0, "overall_score": 0}

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
            solution_boxes.append(b)
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
            solution_boxes.append(b)
            solution_data['number_of_items'] += 1
            solution_data['capacity'] += b.volume
        else:
            # Adding it to the list without adding it to the container
            solution_boxes.append(b)
        # if we know all boxes must be in container, then we can stop here
        # else:
        #     return None

    solution_data['order_score'] = order_metric(solution_boxes, boxes, container)
    solution_data['overall_score'] = overall_metric(solution_boxes, boxes, container, solution_data, False)
    return solution_boxes, solution_data

def algo():
    # every key in json is a string in python dict.
    obj = json.loads(sys.argv[1])

    container = Container(obj['container']['width'],
                          obj['container']['height'],
                          obj['container']['length'])

    boxes = []

    for b in obj['boxes']:
        p = b['priority'] if b.get('priority', None) else 0
        t = b['taxability'] if b.get('taxability', None) else 0
        boxes.append(Box(b['id'], b['order'], b['type'], b['width'],
                         b['height'], b['length'], p, t, weigth='0', color=b['color'], isIn=b['isIn']))

    boxes = sorted(boxes, key=lambda x: x.order, reverse=True)

    solution_list = {}
    counter = 0
    for _ in range(NUMBER_OF_ITERATIONS):
        copy_boxes = copy.deepcopy(boxes)
        container.start_packing()

        rotation(copy_boxes)
        perturbation(copy_boxes)
        temp = constructive_packing(copy_boxes, container)
        if temp is None:
            continue

        boxes_in_solution, solution_data = temp
        if boxes_in_solution is not None and solution_data is not None:
            counter_string = f'{counter}'
            solution_list[counter_string] = {
                "name": "solution " + counter_string ,"id": counter, "boxes": boxes_in_solution, "solution_data": solution_data}
            counter += 1

    if True:
        solution_list = sorted(solution_list.values(), key = lambda x: x["solution_data"]["number_of_items"], reverse=True)[0:50]
        solution_list = sorted(solution_list, key = lambda x: x["solution_data"]["capacity"], reverse=True)[0:25]
        solution_list = sorted(solution_list, key = lambda x: x["solution_data"]["order_score"], reverse=False)[0:10]
    else:
        solution_list = sorted(solution_list.values(), key = lambda x: x["solution_data"]["order_score"], reverse=False)[0:20]
        solution_list = sorted(solution_list, key = lambda x: x["solution_data"]["number_of_items"], reverse=True)[0:15]
        solution_list = sorted(solution_list, key = lambda x: x["solution_data"]["capacity"], reverse=True)[0:10]
    #solution_list = sorted(solution_list.values(), key = lambda x: x["solution_data"]["overall_score"], reverse=True)[:10]
    solution_list = sorted(solution_list, key = lambda x: x["solution_data"]["overall_score"], reverse=True)

    solution_dict = dict()
    for index, val in enumerate(solution_list):
        index_string = f'{index}'
        solution_dict[index_string] = val
    return solution_dict


print(algo())
