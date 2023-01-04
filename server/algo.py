import sys
import json
"""
ב-VIEW יש רשימה של קופסאות להשתמש בהם כדי לבדוק את השרת
"""

"""
the structure of the file is:
contWidth, contHeight, contLength, maxWeight
,,,,,,,,,
id, order, type, taxabilty, weight, priority, width, height, length,isFlipable, isFragile
M boxes. N stations
a_1, a_2, a_3, a_4, a_5 = [5,5,5], 

"""

"""
algorithm phases:
1. preprocessing phase in which items, who share similar dimensions,
    are combined into larger blocks. given a set of boxes it chooses
    randomly betweem these options for predefined number of iterations:
    a. stop preprocessing and move on to next phase.
    b. keep preprocessing and combine 2 items who share 2 dimensions.
    c. keep preprocessing and combine 3 items who share 3 dimensions.

    assign the following properties to a block:
    (i) taxability and priority values which are the sum of the individual items'
        taxability and priorities, respectively, which is consistent
        with our loading objectives.
    (ii) the customer number of the later costumer to serve.
    (iii) the label "fragile" if at least one of the composing items is fragile

2. sorting and controlled perturbation phase:
    sort items by decreasing order.
    in each iteration of the algorithm choose randomly:
    a. 

pseudo code:

RCH(N, boxes, container, pp, retry):
    for itertaion 1 to N:
        sort boxes by decreasing order.
        
        choose perturbation randomly by these options:
        1a. for each box choose randomly orientation.
        1b. for a subset of boxes with similar dimensions choose randomly a feasable orientation

        choose perturbation randomly by these options:
        2a. for each 2 boxes (b1,b2) in a row if (volume b1) / (volume b2) in [0.7,1.3]
            then switch the boxes in 50 %.
        2b. for each 2 boxes (b1,b2) in a row if (prop b1) / (prop b2) in [start, end]
            then switch the boxes in 50 %.

       constructivePacking(boxes, container, pp, retry)


constructivePacking(boxes, container, pp, retry):
     solution_boxes = []
     for each box:
        bestP = none
        best_serface = -1
        for each point in pp:
            cur_surface = checkfeasable(box, boxes, container,point).
            bestP, best_surface = get_best_point(bestP, point, best_surface, cur_surface)
            
        if bestP is not None:
            box.position = bestP
            solution_boxes.append(box)
            remove bestP from pp.
            updatePP(pp, box, solution_boxes, container)
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

checkfeasable(box, boxes, container, point):
    need to check 3 things:
        1. surface area of box.
        2. out of bounds.
        3. overlapping with other boxes.

    return the surface area of box.

get_best_point(bestP, point, best_surface, cur_surface):
    if cur_surface > best_surface:
        return point, cur_surface
    
    if cur_surface == best_surface:
        if bestP.z > point.z:
            return point, cur_surface
    return bestP, best_surface

updatePP(box, solution_boxes, container):
    "need to check if box.x or box.z are smaller than the box below"

    if box.y < container.y:
        pp.append([box.z, box.x, box.y + box.height])
    
    
    
    


comparepoints(point1, point2):


"""


# every key in js is a string in python dict.
obj = json.loads(sys.argv[1])
print(f"the input is\n {obj}")
sorted(obj, key=lambda x: x['order'])

print(f"\nthe sorted is\n {obj}")
