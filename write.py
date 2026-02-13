file_read = open('codingal.txt', 'r')
print("File in read mode")
print(file_read.read())
file_read.close()

file_write = open('codingal.txt', 'w')
file_write.write("File in write mode..")
file_write.write("Hi i am penguin and i am 1 years old")
file_write.close()

file_append = open('codingal.txt', 'a' )
file_append.write("\n fileis in append mode...\n")
file_append.write("Hi i am a penguin and i am 1 years old")
file_append.close()