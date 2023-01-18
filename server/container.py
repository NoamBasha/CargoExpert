from box import Box
import numpy as np

class Container:
    def __init__(self, width=0, height=0, length=0, max_weight=0, support_vector=1.0):
        self.size = width, height, length
        self.volume = width*height*length
        self.max_weight = max_weight
        self.min_support_vector = support_vector

    def start_packing(self,):
        self.space = np.zeros(self.size, np.int32)

    def get_score(self, b: Box, p: tuple[int]) -> tuple[float, int, int]:
        """the score is a tuple containing 3 numbers:
            1. the support factor the box has underneath.
            2. the distance from the rear to the point.
            3. the distance from the top to the point.
            
            Each value, the bigger he is the bigger chances for that point
            to be selected.
        """    
        if not self.space:
            raise "error!! no space member in container"
        
        b_size = b.get_size()

        # check boundaries irregularities
        if p[0] + b_size[0] > self.size[0] or \
            p[1] + b_size[1] > self.size[1] or \
            p[2] + b_size[2] > self.size[2]:
            return (0.0,0,0)
        
        # check for boxes overlapping
        if np.any(self.space[p[0]: p[0] + b_size[0], \
                             p[1]: p[1] + b_size[1], \
                             p[1]: p[2] + b_size[2]] > 0):
            return (0.0,0,0)

        # to calculate support factor we check how many 1's are underneath that point.
        # i.e., how mauch of the base can be supported by other box
        support_factor = np.count_nonzero(self.space[p[0]: p[0] + b_size[0], p[1]-1, p[2]: p[2] + b_size[2]]) / 100

        rear_distance = self.size[2] - p[2]
        top_distance = self.size[1] - p[1]

        return(support_factor, rear_distance, top_distance)
    
    def place(self, b: Box, p: tuple[int]):
        b_size = b.get_size()
        self.space[p[0]: p[0] + b_size[0], p[1]: p[1] + b_size[1], p[2]: p[2] + b_size[2]] = 1
        b.set_position = p 
    
    def update(self, b: Box, p: tuple[int], pp: list[tuple[int]]):
        """
            update the list of potential points according the given box 
            and the point where he was placed.
        """
        
        pp.remove(p)
        b_size = b.get_size()

        # if the top of the box is lower than the top of container then add the
        # box's FLT corner.
        if p[1] + b_size[1] < self.size[1]:
            pp.append((p[0], p[1] + b_size[1], p[2]))

        b_RLB = (p[0], p[1], p[2] + b_size[2])
        b_RRB = (p[0] + b_size[0], p[1], p[2] + b_size[2])
        b_FRB = (p[0] + b_size[0], p[1], p[2])

        for corner in [b_RLB, b_RRB, b_FRB]:
            pp.append(self.get_vertical_projection(corner))
    
    def get_vertical_projection(self, p: tuple[int, int, int]):
        first_one_index = np.argmax(np.flip(self.space[p[0],:p[1],p[2]]))
        return (p[0], p[1] - first_one_index, p[2])

