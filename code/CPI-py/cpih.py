# this reads the associated Excel File (published by the ONS) file 'w1w3tablesannexa.xls'
# to change the year, change the column number selected using the variable 'size'
# to change from CPIH to CPI or RPI change the selected 'sheet' (ranges may not correctly correspond)

import pandas as pd
import json

def compile_cpih():
    xls = pd.ExcelFile('w1w3tablesannexa.xls')
    sheet = pd.read_excel(xls, 'W3-CPIH')
    name = 2
    size = 16

    food = []
    alcohol = []
    clothing = []
    housing = []
    health = []
    transport = []
    furniture=[]
    comms = []
    recreation = []
    education = []
    restaurants = []
    misc = []

    for i in range(23,32):
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        food.append(thing)
    
    print(food)

    for i in range(34,36):
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        food.append(thing)

    for i in [38,39,40,42]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        alcohol.append(thing)


    for i in [45,46,47,49]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        clothing.append(thing)

    for i in [51,53,60,61,64,65,66,67,69]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        housing.append(thing)

    for i in range(56,58):
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        housing.append(thing)  
    
    for i in [72,73,75,78,79,81,83,86,87]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        furniture.append(thing) 

    for i in [90, 91, 94, 95, 97]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        health.append(thing) 

    for i in [100, 101, 102, 105,106,107,108,111,112,113,114]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        transport.append(thing)

    for i in [116,118]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        comms.append(thing)  

    for i in [121,122,123,124,125,128,131,132,133,134,137,138,141,142,143,145]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        recreation.append(thing) 
    
    education.append({"name": sheet.iloc[147][name], "size": sheet.iloc[147][size]})

    for i in [150,151,153]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        restaurants.append(thing)

    for i in [156,157,160,161,163,166,167,171,173]:
        thing = {}
        thing["name"] = sheet.iloc[i][name]
        thing["size"] = sheet.iloc[i][size]
        misc.append(thing) 

    cpih = {
        "name": "cpih",
        "children": [
            {
                "name": "food",
                "children": food
            },
            {
                "name": "alcohol",
                "children": alcohol
            },
            {
                "name": "clothing",
                "children": clothing
            },
            {
                "name": "housing",
                "children": housing
            },
            {
                "name": "health",
                "children": health
            },
            {
                "name": "transport",
                "children": transport
            },
            {
                "name": "furniture",
                "children": furniture
            },
            {
                "name": "comms",
                "children": comms
            },
            {
                "name": "recreation",
                "children": recreation
            },
            {
                "name": "education",
                "children": education
            },
            {
                "name": "restaurants",
                "children": restaurants
            },
            {
                "name": "misc",
                "children": misc
            },
        ]
    }

    f = open('cpih.json', 'w')
    json.dump(cpih, f)
    f.close()
    
compile_cpih()
