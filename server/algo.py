import sys
import json
from  box import Box
from  container import Container

"""
the structure of the file is:
contWidth, contHeight, contLength, order, type, width, height, length, priority ,taxabilty

box's width should  be parallel to container's width. the same goes for height and length.

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
            remove bestP from pp.
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

get_best_point(bestP, point, best_surface, cur_surface):
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
# every key in json is a string in python dict.


obj = json.loads(sys.argv[1])

container = Container(obj['container']['width'],\
                    obj['container']['height'],\
                    obj['container']['length'])

boxes = []

for b in obj['boxes']:
    p = b['priority'] if b.get('priority', None) else 0
    t = b['taxability'] if b.get('taxability', None) else 0
    boxes.append(Box(b['order'], b['type'],b['width'],
                    b['height'], b['length'],p,t))


boxes = sorted(boxes,key=lambda x: x.order)
