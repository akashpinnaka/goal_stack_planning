#! /usr/bin/python
from enum import Enum
from itertools import product
import copy
import collections

class Block:
    """
    Block in world of blocks
    @members :
        label - label of the block
        parent - block above the current block
        child - block below the current block
    """

    def __init__(self, _label, _pos,  _parent=None, _child=None):
        self.__label__ = _label
        self.__parent__ = _parent
        self.__child__ = _child
        self.__pos__ = _pos

    def isClear(self):
        return self.parent is None

    def isOnTable(self):
        return self.child is None and not Hold(self)

    def printBlock(self):
        print("label: {}".format(self.label))
        print("parent: {}".format(
            self.parent.label if self.parent is not None else None))
        print("child: {}".format(
            self.child.label if self.child is not None else None))
        print("is on Table : {}".format(self.isOnTable()))
        print("is Clear: {}".format(self.isClear()))

    @property
    def label(self):
        return self.__label__

    @property
    def parent(self):
        # global i_table
        # size = len(i_table[self.__pos__])
        # print("size {}, position {}".format(size, self.__pos__))
        # for index, block in i_table[self.__pos__]:
        #     if(block.label == self.label):
        #         if(index != 0 or index != size - 1):
        #             return i_table[self.__pos__][index]

        return self.__parent__

    @property
    def child(self):
        return self.__child__

    @property
    def position(self):
        return self.__pos__

    @label.setter
    def label(self, _label):
        self.__label__ = _label

    @parent.setter
    def parent(self, _parent):
        self.__parent__ = _parent
        if(_parent is not None):
            _parent.child = self

    @child.setter
    def child(self, _child):
        self.__child__ = _child
        if(_child is not None):
            _child.__parent__ = self

    @position.setter
    def position(self, _pos):
        self.__pos__ = _pos

def isArmAt(loc):
    global Arm
    if(Arm["position"] is not None):
        return Arm["position"] == loc
    else:
        return False

def ArmEmpty():
    global Arm
    return Arm["position"] is None

def On(x, y):
    if(x is not None and y is not None):
        return (y.parent is not None) \
            and (y.parent.label == x.label) \
            and (x.child is not None) \
            and (x.child.label == y.label)

def Above(x, y):
    if(x is not None and y is not None):
        if(x.position != y.position):
            return False 
        else:
            temp = y
            while(temp.parent is not None):
                if(temp.parent.label == x.label):
                    return True
                temp = temp.parent
            return False

def Hold(x):
    global Arm
    if(Arm is not None and x is not None):
        return Arm["block"] == x.label
    else:
        return False

def Clear(x):
    if(x is not None):
        return x.isClear()

def Table(x):
    if(x is not None):
        return x.isOnTable()

def getOnTableBlockForLocation(pos, state):
    for blk in state[pos]:
        if(blk.isOnTable() and blk.position == pos):
            return blk

def topBlockAtLoc(location, state):
    if(len(state[location]) > 0):
        last_element_index = len(state[location])-1
        return state[location][last_element_index]
    else:
        return None

def printTable(table):
    index = max([len(table[loc]) for loc in table.keys()])
    while(index > 0):
        index -= 1
        for loc in table.keys():
            blk_detail = "[ {} ]"
            try:
                print(blk_detail.format(table[loc][index].label), end=" ")
            except IndexError:
                print("     ", end=" ")
        print("\n")
        if(index == 0):
            print("------------------------")
            for loc in table.keys():
                print("[ {} ]".format(loc), end=" ")
            print("\n------------------------\n\n\n")

def moveArmTo(to_location):
    if(Arm["position"] is not None):
        Arm["position"] = to_location
    else:
        pass

def getBlock(label, state):
    for slot in state.keys():
        for block in state[slot]:
            if(block.label == label):
                return block  

def buildBlocksFromBluePrint(bprint):
    for slot in bprint.keys(): #1 
        stack = bprint[slot] #A,B
        blockStack= []
        for block in stack:
            _child = None
            try:
               _child = blockStack.pop() 
               blockStack.append(_child)
            except Exception as e:
                pass
            # print(block)
            # print("end-----------------------")
            block = Block(block,slot) # A
            block.child = _child
            blockStack.append(block)
        bprint[slot] = blockStack
    return bprint

if(__name__ == "__main__"):
    Arm = {"position": None, "block": None}
    i_table = collections.OrderedDict([(1, ['A', 'B']), (2, ['C', 'D']), (3, ['E', 'F']), (4, ['G', 'H'])])
    o_table = collections.OrderedDict([(1, ['E', 'A']), (2, ['B', 'C']), (3, ['G', 'D', 'H', 'F']), (4, [])])
    buildBlocksFromBluePrint(i_table)
    buildBlocksFromBluePrint(o_table)

# print(i_table[1])


def getReadyToUnStack(block):
    pass

def unstack(block):
    global Arm, i_table, tmp_location
    getReadyToUnStack(block)
    top_block_at_block_location = topBlockAtLoc(block.position, i_table)
    if(block != None and top_block_at_block_location == block):
        tmp = block
        i_table[block.position].pop()
        if(not Table(block)):
            top_block_at_block_location.child.parent = None
        top_block_at_block_location.child = None
    else:
        # stack(block.parent, tmp_location)
        pass




def pickup(location):
    pass

# Methods for actions

# preConditions: ArmHasBlock(block), ArmIsOn()
def getReadyToStack(block, stack_location):
    global Arm, i_table
    #ArmHasBlock(block)
    if(Arm["block"] == block.label):
        pass
    else:
        # Unstack(block) / pickup(block)
        if(topBlockAtLoc(block.position, i_table) == block):
            unstack(block)
        else:
            unstack(block.parent)
    #ArmIsOn(stack_location)    
    # Check if arm is on right position to stack
    if(Arm["position"] == stack_location):
        pass
    else:
        Arm["position"] = stack_location



def stack(block, location):
    global Arm, i_table
    getReadyToStack(block, location)
    if topBlockAtLoc(location, i_table) is not None:
        current_top_block = topBlockAtLoc(location, i_table)
        current_top_block.parent = block
        block.child = current_top_block
        block.position = location
        i_table[location].append(block)



printTable(o_table)
printTable(i_table)


# Unstack all the blocks in all the locations and move to location 1 and stack them.

for location in [2, 3, 4]:
    blocks_in_location = i_table[location]
    for block in blocks_in_location[::-1]:
        stack(block, 1)
        printTable(i_table)



global current_location
current_location = 3
global tmp_location
tmp_location = 2

def unstackRecursive(block, target_block):
    global i_table
    if(block is not None):
        unstackRecursive(block.parent, target_block)
        if(block == target_block):
            if block in i_table[block.position]:
                block.position = current_location
                i_table[current_location].append(block)
                if(len(i_table[current_location]) == 0):
                    pass
                else:
                    top_block_in_current_loc = topBlockAtLoc(current_location, i_table)
                    top_block_in_current_loc.parent = block
                    block.child = top_block_in_current_loc

        else:
            block.position = tmp_location
            i_table[tmp_location].append(block)
            if(len(i_table[tmp_location]) == 0):
                pass
            else:
                top_block_in_tmp_loc = topBlockAtLoc(tmp_location, i_table)
                top_block_in_tmp_loc.parent = block
                block.child = top_block_in_tmp_loc
        if block.child != None:
            block.child.parent = None
        block.child = None
        print(block.label, end="****\n")
        # if block in i_table[block.position]:
        block_1 = getBlock(block.label, i_table)
        print("block {} position {}".format(block.label,block.position))
        print("block_1 {} position {}".format(block_1.label,block_1.position))
        parent = block.parent.label if block.parent else None
        print("block {} and parent {}".format(block.label, parent))
        try:
            i_table[block_1.position].remove(block)
        except:
            pass
        printTable(i_table)


for block in o_table[current_location]:
    unstackRecursive(getBlock(block.label, i_table), getBlock(block.label, i_table))



current_location = 3
tmp_location = 4

for block in o_table[current_location]:
    print(getBlock(block.label, i_table).position)
    # unstackRecursive(getBlock(block.label, i_table), getBlock(block.label, i_table))

printTable(o_table)

