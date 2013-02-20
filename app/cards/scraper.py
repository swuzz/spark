import xml.etree.ElementTree as ET
import urllib
import json

def uploadCardData():
	cards = ET.parse('cards.xml').getroot()
	for card in cards:
		cardObj = {}
		cardObj['name'] = card.findtext('name').encode('utf-8')
		cardObj['imgUrl'] = card[1].attrib['picURL']
		cardObj['cardType'] = card.findtext('type').encode('utf-8')
		urllib.urlopen("http://sudden-ocelot.appspot.com/cards", urllib.urlencode(cardObj))

def createCardsJson():
	cards = ET.parse('cards.xml').getroot()
	cardsJson = []
	for card in cards:
		cardObj = {}
		cardObj['name'] = card.findtext('name').encode('utf-8')
		cardObj['imgUrl'] = card[1].attrib['picURL']
		cardObj['cardType'] = card.findtext('type').encode('utf-8')
		cardsJson.append(cardObj)
	cardsJson = sorted(cardsJson, key=lambda k:k['name'])
	f = open('cards.json', 'w')
	f.write(json.dumps(cardsJson))

if __name__ == '__main__':
	createCardsJson()
