import urllib.request
from bs4 import BeautifulSoup
import json

postcodes = []

with open('top_level_postcodes.json', 'r') as j:
    toppostcodes = json.load(j) 
# toppostcodes = ['np']

address = 'http://www.home.co.uk/for_rent/current_rents_by_postcode.htm?postal_area='
targetclass = 'homeco_bullet_list'

for postcode in toppostcodes:
    page = urllib.request.urlopen(address + postcode)
    soup = BeautifulSoup(page)
    ul = soup.find('ul', attrs={'class': targetclass})
    lis = [li for li in ul.findAll('li')]
    for li in lis:
        text = li.text.split()[-1]
        postcodes.append(text)
    print(postcode + " done")

print(postcodes)

with open('low_level_postcodes.json', 'w') as w:
    json.dump(postcodes, w)

