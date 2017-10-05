import csv

infile = open('rents8.csv', 'r')
outfile = open('rents-2.csv', 'w')

f = csv.DictReader(infile, delimiter=',')
g = csv.writer(outfile, delimiter=',')

fhead = f.fieldnames
ghead = ['postcode', 'totalprops', 'last14', 'average', 'median', 'avgtom']

g.writerow(ghead)
for row in f:
    newrow = []
    newrow.append(row[fhead[0]])
    try:
        newrow.append(int(row[fhead[1]]))
    except ValueError:
        newrow.append('') 
    newrow.append(row[fhead[2]]) 
    try:
        myString = row[fhead[3]].split(' ')[0].replace(',','')
        x = myString.index('£')
        print(x)
        newrow.append(int(myString[x+1:]))
    except ValueError:
        newrow.append('')
    try:
        myString = row[fhead[4]].split(' ')[0].replace(',','')
        x = myString.index('£')
        print(x)
        newrow.append(int(myString[x+1:]))
    except ValueError:
        newrow.append('')
    try:
        newrow.append(int(row[fhead[5]].split(' ')[0]))
    except ValueError:
        newrow.append('')
    g.writerow(newrow)


