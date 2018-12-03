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
        return Arm.label == x.label
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
    last_element_index = len(state[location])-1
    return state[location][last_element_index]

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
            print("\n------------------------\n")

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


# Methods for actions
def putDown(block, location):
    global Arm, i_table
    # getReadyToPutDown()
    Arm["position"] = 1
    if Arm["position"] == location:
        i_table[location].append(block)
    # buildBlocksFromBluePrint(i_table)


printTable(i_table)


# Unstack all the blocks in all the locations and move to location 1 and stack them.

for location in [2, 3, 4]:
    blocks_in_location = i_table[location]
    blocks_in_location.reverse()
    # print(blocks_in_location)
    for block in blocks_in_location:
        # print(block.label)
        putDown(block, 1)


printTable(i_table)