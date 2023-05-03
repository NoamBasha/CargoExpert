from enum import Enum


class Rotation(Enum):
    """
    Each letter stands for a box axis - W = width, H = height, L = length.
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

class Box:
    def __init__(self, id='0', order='0', box_type='', width='0', height='0', length='0',
                 color='gray', isIn=0, center=[0,0,0]):
        # casting for convenient
        width, height, length =  int(width), int(height), int(length)

        self.id = int(id)
        self.order =  int(order)
        self.box_type = box_type
        self.size = width, height, length
        self.volume = width*height*length
        self.rotation = Rotation.WHL

        self.center = [float(axis) for axis in center]
        self.FLB = (self.center[0] - self.get_size()[0]/2, self.center[1] - \
                self.get_size()[1]/2, self.center[2] - self.get_size()[2]/2)
        self.color = color
        self.isIn = int(isIn)

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
