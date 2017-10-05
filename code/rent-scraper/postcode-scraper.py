import urllib.request
from bs4 import BeautifulSoup
import json

postcodes = []

address = 'http://www.home.co.uk/for_rent/current_rents_by_postcode.htm'
page = urllib.request.urlopen(address)
soup = BeautifulSoup(page)
ul = soup.find('ul', attrs={'class': 'homeco_bullet_list'})
lis = [li for li in ul.findAll('li')]

for li in lis:
    aa = [a.text for a in li.findAll('a')]
    for a in aa:
        postcodes.append(a)

print(postcodes)

with open('top_level_postcodes.json', 'w') as j:
    json.dump(postcodes, j)


