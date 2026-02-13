file1 = open('codingal.txt', 'r')
file2 = open('codingalupdated.txt', 'w')
for line in file1.readlines():
    if not (line.startswith('coding')):
        print(line)
        file2.write(line)
file2.close()
file1.close()
