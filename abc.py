from abc import ABC, abstractmethod
class animal(ABC):
    def move(self):
        pass
class Human(animal):
    def move(self):
        print("Human can walk and run")
class Snake(animal):
    def move(self):
        print("Snake can crawl")
class Dog(animal):
    def move(self):
        print("Dog can bark")
class Lion(animal):
    def move(self):
        print("Lion can roar")
R = Human()
R.move()
S = Snake()
S.move()
D = Dog()
D.move()
L = Lion()
L.move()
