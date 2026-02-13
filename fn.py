fn = open('codingal.txt', 'r')
fnl = open('codingalupdated.txt', 'w')
cont = fn.readlines()
type(cont)
for i in range(1, len(cont)+1):
    if (i % 2 != 0):
        fnl.write(cont[i-1])
    else:
        pass
fnl = open('codingalupdated.txt', 'r')
cont1 = fnl.read()
print(cont1)
fn.close()
fnl.close()


