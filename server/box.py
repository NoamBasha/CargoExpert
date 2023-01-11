
class Box:
    def __init__(self, order=0, box_type='' ,width=0, height=0, length=0, priority=0, taxability=0, weigth=0):
        self.order = order
        self.box_type = box_type
        self.width = width
        self.height = height
        self.length = length
        self.priority = priority
        self.taxability = taxability
        self.weight = weigth
        self.position = (0,0,0)
    
    def __str__(self) -> str:
        return self.order.__str__() + ' ' + self.box_type

