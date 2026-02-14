with open ('codingal.txt', 'w') as file:
    file.write("Hi i am a penguin and i am 1 years old")
file.close()
with open ('codingal.txt', 'r') as file:
    data = file.readlines()
    print("Words in this file are..")
    for line in data:
        words = line.split()
        for word in words:
            print(word)
file.close()
