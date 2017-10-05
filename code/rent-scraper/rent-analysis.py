# checking rent affordability by 40% of a minimum wage income

import csv

infile = open('./data/rents-cleaned.csv', 'r')
f = csv.DictReader(infile, delimiter=',')
fhead = f.fieldnames

total = 0
counter = 0
nocounter = 0

for row in f:
    total += 1
    try:
        x = int(row[fhead[3]])
        if x==0:
            nocounter +=1
        elif x > 520:
            counter +=1
    except ValueError:
        print('Value Error')
        nocounter +=1

print('total = ' + str(total-nocounter), 'counter = ' + str(counter), 'nocounter = ' + str(nocounter))
