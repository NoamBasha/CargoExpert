from box import Box
import numpy as np


class Container:
    def __init__(self, width='0', height='0', length='0', max_weight='0'):
        # casting for convenient
        width, height, length = int(width), int(height), int(length)

        self.size = width, height, length
        self.volume = width*height*length
        self.max_weight = int(max_weight)
        self.i = 0

    def start_packing(self,):
        # for sreamlining the process we can do:
        # if self. space:
        #   del self.space

        # maybe change to dtype into bool
        self.space = np.zeros(self.size, np.int32)

    def score_FLB(self, b_size: tuple[int, int, int], p: tuple[int, int, int]) -> tuple[tuple[int, int, int], str]:
        # calculate the other corners of the box if its FLB corner is placed in p.
        FRB, FLT, RLB = p[0] + b_size[0] - 1, p[1] + \
            b_size[1] - 1, p[2] + b_size[2] - 1
        self.i += 1
        # check boundaries irregularities
        if FRB >= self.size[0] or FLT >= self.size[1] or RLB >= self.size[2]:
            return (0, 0)

        # check for boxes overlapping
        if np.any(self.space[p[0]: FRB + 1, p[1]: FLT + 1, p[2]: RLB + 1] > 0):
            return (0, 0)

        # to calculate support factor we check how many 1's are underneath that point.
        # i.e., how mauch of the base of this box can be supported by other box
        if p[1] != 0 and np.any(self.space[p[0]: FRB + 1, p[1]-1, p[2]: RLB + 1] == 0):
            return (0, 0)

        # need to check if the distance should be measured with respect to the FLB or to other corners.
        rear_distance = self.size[2] - p[2]
        top_distance = self.size[1] - p[1]

        return (rear_distance, top_distance)

    def score_FRB(self, b_size: tuple[int, int, int], p: tuple[int]) -> tuple[int, int, int]:
        # calculate the other corners of the box if its FRB corner is placed in p.
        FLB, FRT, RRB = p[0] - b_size[0] + 1, p[1] + \
            b_size[1] - 1, p[2] + b_size[2] - 1

        # check boundaries irregularities
        if FLB < 0 or FRT >= self.size[1] or RRB >= self.size[2]:
            return (0, 0)

        # check for boxes overlapping
        if np.any(self.space[FLB: p[0] + 1, p[1]: FRT + 1, p[2]: RRB + 1] > 0):
            return (0, 0)

        # to calculate support factor we check how many 1's are underneath that point.
        # i.e., how mauch of the base of this box can be supported by other box
        if p[1] != 0 and np.any(self.space[FLB: p[0] + 1, p[1]-1, p[2]: RRB + 1] == 0):
            return (0, 0)

        rear_distance = self.size[2] - p[2]
        top_distance = self.size[1] - p[1]

        return (rear_distance, top_distance)

    def score_RLB(self, b_size: tuple[int, int, int], p: tuple[int]) -> tuple[int, int, int]:
        raise Exception('unimplimented method score_RLB')

    def score_RRB(self, b_size: tuple[int, int, int], p: tuple[int]) -> tuple[int, int, int]:
        raise Exception('unimplimented method score_RRB')

    def get_score(self, b: Box, p: tuple[int]) -> tuple[float, int, int] | Exception:
        """the score is a tuple containing 3 numbers:
            1. the support factor the box has underneath.
            2. the distance from the rear to the point.
            3. the distance from the top to the point.

            Each value, the bigger it is the bigger chances for that point
            to be selected.
        if not self.space:
            raise Exception("error!! no space member in container")
        """

        b_size = b.get_size()
        if p[3] == 1:
            return self.score_FLB(b_size, p)
        return self.score_FRB(b_size, p)

    def place(self, b: Box, p: tuple[int, int, int, int]):
        b_size = b.get_size()
        match p[3]:
            case 1:
                self.space[p[0]: p[0] + b_size[0], p[1]: p[1] +
                           b_size[1], p[2]: p[2] + b_size[2]] = 1
                b.set_position((p[0], p[1], p[2]))
            case - 1:
                self.space[p[0] - b_size[0] + 1: p[0] + 1, p[1]: p[1] + b_size[1], p[2]: p[2] + b_size[2]] = 1
                b.set_position((p[0] - b_size[0] + 1, p[1], p[2]))
            case _:
                raise Exception(
                    'unimplimented case - default (container.place)')

    def update(self, b: Box, p: tuple[int, int, int, int], pp: set[tuple[int]]):
        """
            update the list of potential points according the given box 
            and the point where he was placed.
        """

        pp.remove(p)
        b_size = b.get_size()

        # if the top of the box is lower than the top of container then add the
        # box's FLT corner.
        if p[1] + b_size[1] < self.size[1]:
            pp.add((p[0], p[1] + b_size[1], p[2], p[3]))

        if p[3] == 1:
            p1 = (p[0] + b_size[0], p[1], p[2], 1)  # b_FRB
            p2 = (p[0], p[1], p[2] + b_size[2], 1)  # b_RLB
        else:
            p1 = (p[0] - b_size[0], p[1], p[2], -1)  # b_FLB
            p2 = (p[0], p[1], p[2] + b_size[2], -1)  # b_RRB

        for corner in [p1, p2]:
            projection = self.get_vertical_projection(corner)
            if projection != None:
                pp.add(projection)

    def get_vertical_projection(self, p: tuple[int, int, int, int]):
        """
        rlb should be adde only if differennt lengths
        rrb should be adde only if (differennt widths or different widths)
        frb should be adde only if differennt widths
        """

        # check boundries.
        if p[0] < 0 or p[0] >= self.size[0] or\
                p[1] < 0 or p[1] >= self.size[1] or\
                p[2] < 0 or p[2] >= self.size[2]:
            return None

        # check if the point is occupied by another box:
        if self.space[p[0], p[1], p[2]] == 1:
            return None

        # if the box lies direclty on container's floor.
        if p[1] == 0:
            return (p[0], p[1], p[2], p[3])

        first_one_index = np.argmax(np.flip(self.space[p[0], 0:p[1], p[2]]))
        return (p[0], p[1] - first_one_index, p[2], p[3])
