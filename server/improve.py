import copy
import sys
import json
import random
import algo
from box import Box, Rotation
from container import Container

NUMBER_OF_ITERATIONS = 1000

def improve_packing(in_boxes: list[Box], out_boxes: list[Box], container: Container) -> list[Box]:
    
    # We are receiving a list boxes with isIn bit on or off.
    # We need to treat boxes with isIn bit on as constants.
    # We need to find pps from this boxes.
    # After having those pps, we need to run the algorithm with those pps and the rest of the boxes.

    # Updating pps by every box

    pp = set([(0, 0, 0, 1), (container.size[0] - 1, 0, 0, -1)])

    retry_list = []
    solution_boxes = []
    solution_data = {"number_of_items": 0, "capacity": 0, "order_score": 0, "overall_score": 0}

    for box in in_boxes:
        p = (box.FLB[0], box.FLB[1], box.FLB[2], 1)
        container.update(box, p, pp)
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

    improved_boxes = in_boxes + out_boxes
    return improved_boxes

def improve():
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
                         b['height'], b['length'], p, t, weigth='0', color=b['color'], isIn=b['isIn'], center=b['center']))

     # Splitting to two lists
    in_boxes, out_boxes = [box for box in boxes if box.isIn == 1], [box for box in boxes if box.isIn == 0]
    # Sort isIn's by y coordinate - TODO: use .size?
    in_boxes = sorted(in_boxes, key=lambda box: ((box.center[1] - box.get_size()[1] / 2),(box.center[2] - box.get_size()[2] / 2)))

    solution_list = {}
    counter = 0
    for _ in range(NUMBER_OF_ITERATIONS):
        copy_boxes = copy.deepcopy(boxes)
        container.start_packing()

        algo.rotation(copy_boxes)
        algo.perturbation(copy_boxes)
        temp = improve_packing(in_boxes, out_boxes, container)
        if temp is None:
            continue

        boxes_in_solution, solution_data = temp
        if boxes_in_solution is not None and solution_data is not None:
            counter_string = f'{counter}'
            solution_list[counter_string] = {
                "name": "solution " + counter_string ,"id": counter, "boxes": boxes_in_solution, "solution_data": solution_data}
            counter += 1

    solution_list = sorted(solution_list, key = lambda x: x["solution_data"]["overall_score"], reverse=True)[0]

    solution_dict = dict()
    for index, val in enumerate(solution_list):
        index_string = f'{index}'
        solution_dict[index_string] = val
    return solution_dict


print(improve())
