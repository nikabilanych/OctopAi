

class Node:
    def __init__(self, value):
        self.value=value
        self.previous=None
class Stack:
    def __init__(self):
        self.head= None
        self.length=0
        
    def push(self,value):
        new_node=Node(value)
        self.length+=1
        if self.head is None:
            self.head=new_node
            return
        new_node.previous=self.head
        self.head=new_node
    def pop(self):
        if self.head is None:
            return None
        tmp=self.head
        self.head=tmp.previous
        self.length-=1
        return tmp.head
    def print(self):
        item=self.head 
        while item is not None:  
            print(item.value)
            item=item.previous


