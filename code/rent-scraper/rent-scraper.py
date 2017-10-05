# import libraries
import urllib.request
import csv
import json
import time
from bs4 import BeautifulSoup

# load in pre-scraped postcodes
with open('./postcode-data/low_level_postcodes.json', 'r') as j:
    postcodes= json.load(j)

# how much scraping is to be done
postcodelength = 1477

def createObject(data, postcode):
    locale = []
    locale.append([postcode, 'postcode'])
    locale.append([data[0][1], 'totalprops'])
    locale.append([data[1][1], 'last14'])
    locale.append([data[2][1], 'average'])
    locale.append([data[3][1], 'median'])
    locale.append([data[4][1], 'avgtom'])

    with open('rents-whole.csv', 'a') as w:
        writer = csv.writer(w)
        writer.writerow(item[0] for item in locale)  
    print(postcode + ' done') 
    w.close()

def retrievePage(code):
    # pull page
    address = "http://www.home.co.uk/for_rent/" + code + "/current_rents?location=" + code
    page = urllib.request.urlopen(address)
    soup = BeautifulSoup(page, "lxml")

    # traverse the soup
    pageclass = "homeco_content_main homeco_content_min_height"
    postcode = soup.find('h1').text.split()[0]
    info = soup.find('div', attrs={'class': pageclass})
    table = info.findAll('table')
    rows = [tr for tr in table[0].findAll('tr')]

    # collect the information
    data = []
    for row in rows:
        td = [td.text for td in row.findAll('td')]
        data.append(td)
    

    print(postcode + ' retrieved')
    createObject(data, postcode)

    # attempt to prevent rate-limit
    time.sleep(5)

def retrieveWholePage(code):
    # pull page
    address = "http://www.home.co.uk/for_rent/" + code + "/current_rents?location=" + code
    page = urllib.request.urlopen(address)
    soup = BeautifulSoup(page, "lxml")

    print(code + ' retrieved')

    # traverse the soup
    pageclass = "homeco_content_main homeco_content_min_height"
    postcode = soup.find('h1').text.split()[0]
    info = soup.find('div', attrs={'class': pageclass})
    tables = info.findAll('table')
    table1 = [tr for tr in tables[0].findAll('tr')]
    table2 = [tr for tr in tables[1].findAll('tr')]
    table3 = [tr for tr in tables[2].findAll('tr')]
    table4 = [tr for tr in tables[3].findAll('tr')]

    data = [code]
    for table in [table1, table2, table3, table4]:
        for row in table:
            td = [td.text for td in row.findAll('td')]
            data.append(td)

    with open('rents-whole.csv', 'a') as w:
        writer = csv.writer(w)
        writer.writerow(item for item in data)  
    print(code + ' done') 
    w.close()

    time.sleep(40)


# for i in range(1475,1478):
#     retrieveWholePage(postcodes[i])

retrieveWholePage('ZE4')

# for postcode in postcodes:
#     retrievePage(postcode)