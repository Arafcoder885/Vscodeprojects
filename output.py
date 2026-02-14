outputFile = open('UpdatedFile.txt', 'w')





inputFile = open('Repeated.txt', 'r')


line_seen_so_far = set()
print("Eliminating duplicate lines...")

for line in inputFile:


    if line not in line_seen_so_far:
        outputFile.write(line)
        line_seen_so_far.add(line)

inputFile.close()
outputFile.close()
