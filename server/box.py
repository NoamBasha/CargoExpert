from enum import Enum

class Rotation(Enum):
    # according to article page 3 figure 2
    # The first letter is parallel to container's width
    # The second letter is parallel to container's height
    # The third letter is parallel to container's length
    WHL = 0
    LHW = 1
    HLW = 2
    LWH = 3
    WLH = 4
    HWL = 5


class Box:
    
    def __init__(self, order=0, box_type='' ,width=0, height=0, length=0, priority=0, taxability=0, weigth=0):
        self.order = order
        self.box_type = box_type
        self.size = width, height, length
        self.volume = width*height*length
        self.rotation = Rotation.WHL
        self.priority = priority
        self.taxability = taxability
        self.weight = weigth
        self.position = None
    
    def get_size(self) -> tuple[int,int, int]:
        """
            gives the right size after considering the  rotation.
            since the box may be rotated in either direction, we need to a method
            to get the correct size of"""
        
        pass
    
    def set_position(self, p: tuple[int,int,int]):
        self.position = p

    def __repr__(self) -> str:
        return self.order.__str__() + ' ' + self.box_type + ' ' + self.rotation.__str__()

    

