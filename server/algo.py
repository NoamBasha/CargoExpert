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

2. sorting phase
"""


# every key in js is a string in python dict.
obj = json.loads(sys.argv[1])

obj['boxes'][0]['id'] = 200

print(obj)
