class square:
    def __init__(self):
        self.__side = 10
    def area(self):
        print("side: ",self.__side)
        print("My area is: ",self.__side**2)

ob = square()
ob.__side = 15
ob.area()