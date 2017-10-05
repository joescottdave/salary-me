import csv
import json

with open('./postcode-data/top_level_postcodes.json', 'r') as j:
    postcode_areas = json.load(j)

data = []
for area in postcode_areas:
    obj = {"area": area, "rents": []}
    with open('./data/rents-cleaned.csv', 'r') as rents:
        r = csv.DictReader(rents, delimiter=',')
        rhead = r.fieldnames
        for row in r:
            if area in row[rhead[0]]:
                obj["rents"].append(row[rhead[3]])
    data.append(obj)

# with open('./data/rents-consolid.json', 'w') as c:
#     json.dump(data, c)


for area in data:
    sum = 0
    rents = area["rents"]
    num = len(rents)
    for rent in rents:
        try:
            sum += int(rent)
        except ValueError:
            sum += 0
    avg = sum/num
    area['avg'] = avg
    print(area)

with open('./data/rents-consolid-with-avgs.json', 'w') as a:
    json.dump(data,a)