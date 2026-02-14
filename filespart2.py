new_file = open('new_file.txt', 'x')
new_file.close()
import os
print("Checking if my_file exists or not...")
if os.path.exists('new_file.txt'):
    os.remove("new_file.txt")
else:
    print("The file does not exist")
my_file = open("my_file.txt", "w")
my_file.write("Hi i am a penguin and i am 1 years old")
my_file.close()
os.remove("codingal.txt")
os.rmdir('Folder')