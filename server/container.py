import numpy as np

class Container:
    def __init__(self, width=0, height=0, length=0, max_weight=0, support_vector=1.0):
        self.size = (width, height, length)
        self.volume = width*height*length
        self.space = np.zeros(self.size)
        self.max_weight = max_weight
        self.min_support_vector = support_vector
    


