import sys
import json
"""
ב-VIEW יש רשימה של קופסאות להשתמש בהם כדי לבדוק את השרת
"""

"""
the structure of the file is:
contWidth, contHeight, contLength, maxWeight
,,,,,,,,,
id,type, taxabilty, weight, priority, width, height, length,isFlipable, isFragile

"""

# every key in js is a string in python dict.
obj = json.loads(sys.argv[1])

obj['container']['maxWeight'] = 200

print(obj)
