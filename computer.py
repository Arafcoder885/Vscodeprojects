class Computer:
    def __init__(self):
        self.__maxprice = 100
    def sell(self):
        print("Selling price: {}".format(self.__maxprice))
    def setMaxPrice(self,price):
        self.__maxprice = price
c = Computer()
c.sell()

c.__maxprice = 150
c.sell()

c.setMaxPrice(150)
c.sell()