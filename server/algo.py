import copy
import sys
import json
import random
from util import order_metric, overall_metric, rotation, perturbation
from box import Box, Rotation
from container import Container

"""
the structure of the file is:
contWidth, contHeight, contLength, order, type, width, height, length, priority ,taxabilty

box's width should be parallel to container's width before we apply any rotation.
the same goes for height and length.
"""



def constructive_packing(boxes: list[Box], container: Container, is_quantity: int) -> list[Box]:
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
    solution_data['overall_score'] = overall_metric(solution_boxes, boxes, container, solution_data, is_quantity)
    return solution_boxes, solution_data

def algo():
    # every key in json is a string in python dict.
    obj = json.loads(sys.argv[1])


    # is_quality vs time - number of epochs
    is_quality = int(obj['project_data']['isQuality'])
    NUMBER_OF_ITERATIONS = 2000 if is_quality else 1000

    is_quantity = int(obj['project_data']['isQuantity'])
    # quantity vs order - overall score and sorting

    # TODO: remove!
    with open('file.txt', 'w') as file:
        print(f'{is_quality}, {is_quantity}', file=file)



    container = Container(obj['container']['width'],
                          obj['container']['height'],
                          obj['container']['length'])

    boxes = []

    for b in obj['boxes']:
        boxes.append(Box(b['id'], b['order'], b['type'], b['width'],
                         b['height'], b['length'], color=b['color'], isIn=b['isIn']))

    boxes = sorted(boxes, key=lambda x: x.order, reverse=True)

    solution_list = {}
    counter = 0
    for _ in range(NUMBER_OF_ITERATIONS):
        copy_boxes = copy.deepcopy(boxes)
        container.start_packing()

        rotation(copy_boxes)
        perturbation(copy_boxes)
        temp = constructive_packing(copy_boxes, container, is_quantity)
        if temp is None:
            continue

        boxes_in_solution, solution_data = temp
        if boxes_in_solution is not None and solution_data is not None:
            counter_string = f'{counter}'
            solution_list[counter_string] = {
                "name": "solution " + counter_string ,"id": counter, "boxes": boxes_in_solution, "solution_data": solution_data}
            counter += 1

    if is_quantity:
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
