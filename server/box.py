from enum import Enum


class Rotation(Enum):
    """
    according to article page 3 figure 2. Each letter stands for the box axe - Width, Heigth and Length.
    The first letter is parallel to container's width
    The second letter is parallel to container's height
    The third letter is parallel to container's length
    """
    WHL = 0
    LHW = 1
    HLW = 2
    LWH = 3
    WLH = 4
    HWL = 5


"""
class Vector:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
    
    def __repr__(self)-> str:
        return f"Vector: x-{self.x}, y-{self.y}, z-{self.z}"
    
    
    def __add__(self, other):
        return Point(self.x + other.x,\
                self.y + other.y,\
                self.z + other.z)
    
    def __gt__(self, other):
        #return True if any of the  other's values is greater than its corresponding value.
        if self.x > other.x or\
            self.y > other.y or\
            self.z > other.z:
            return True
        return False
    
    def __lt__(self, other):
        #return True if any of the  other's values is less than its corresponding value.
        if self.x < other.x or\
            self.y < other.y or\
            self.z < other.z:
            return True
        return False
    
class Point:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
    
    def __repr__(self)-> str:
        return f"Point: x-{self.x}, y-{self.y}, z-{self.z}"
    
    def __add__(self, other: Vector):
        return Vector(self.x + other.x,\
                self.y + other.y,\
                self.z + other.z)
    """

#TODO:add: , center=[0,0,0]
class Box:
    def __init__(self, id='0', order='0', box_type='', width='0', height='0', length='0',
                 priority='0', taxability='0', weigth='0', color='gray', isIn=0):
        # casting for convenient
        id, order, width, height, length = int(id), int(order), int(
            width), int(height), int(length)
        priority, taxability, weigth = int(
            priority), int(taxability), int(weigth)

        self.id = id
        self.order = order
        self.box_type = box_type
        self.size = width, height, length
        self.volume = width*height*length
        self.rotation = Rotation.WHL

        self.priority = priority
        self.taxability = taxability
        self.weight = weigth
        self.FLB = None
        self.center = [width /2 ,height /2,-length /2] #TODO: change to: center
        self.color = color
        self.isIn = isIn

    def get_size(self) -> tuple[int, int, int] | Exception:
        """
        gives the right size after considering the rotation.
        since the box may be rotated in either direction, we need to a method
        to get the correct size of the box after rotation was applied.
        """
        match self.rotation:
            case Rotation.WHL:
                return self.size
            case Rotation.LHW:
                return self.size[2], self.size[1], self.size[0]
            case Rotation.HLW:
                return self.size[1], self.size[2], self.size[0]
            case Rotation.LWH:
                return self.size[2], self.size[0], self.size[1]
            case Rotation.WLH:
                return self.size[0], self.size[2], self.size[1]
            case Rotation.HWL:
                return self.size[1], self.size[0], self.size[2]
            case __:
                raise Exception("error! Box.get_size: no rotation was found!!")

    def set_position(self, p: tuple[int, int, int]):
        self.FLB = p
        self.center = p[0] + self.get_size()[0]/2, p[1] + \
            self.get_size()[1]/2, p[2] + self.get_size()[2]/2
        self.isIn = 1

    def __repr__(self) -> str:
        initial = f'"id": {self.id.__str__()}, "order": {self.order.__str__()}, "size": {list(self.get_size()).__str__()},"position": {list(self.center).__str__()}, "color": \"{self.color}\","text": \"{self.box_type}\","isIn": \"{self.isIn.__str__()}\"'
        return '{' + initial + '}'
