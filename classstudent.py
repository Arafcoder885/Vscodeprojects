class student:
    grade = 10
    name = "Marcus"

    def introduction(self):
        print("Hi i am a student")

    def details(self):
        print("Hi my name is", self.name)
        print("I am in grade", self.grade)

ob = student()
ob.introduction()
ob.details()
