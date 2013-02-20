import cgi
import webapp2
import json

from google.appengine.api import users
from google.appengine.ext import db
from google.appengine.ext.webapp import template

############
## MODELS ##
############
class Player(db.Model):
	name = db.StringProperty()
	
class Deck(db.Model):
	name = db.StringProperty()
	cards = db.TextProperty()
	user = db.ReferenceProperty(Player, collection_name='decks')

#################
## DATA ACCESS ##
#################
class Cards(webapp2.RequestHandler):
	def get(self):
		# return card list
		self.response.headers.add_header('content-type', 'application/json', charset='utf-8')
		for card in cards.fetch(limit=5):
			self.response.out.write(card.name + '\n')
	def post(self):
		# TODO: create a card
		name = self.request.get('name')
		img = self.request.get('imgUrl')
		type = self.request.get('cardType')
		card = Card(name=name, imgUrl=img, type=type)
		card.put()

class Decks(webapp2.RequestHandler):
	def get(self):
		# TODO: get decks from user's name
		pass
	def post(self):
		# TODO: create deck from list of cards and user's name
		deckName = self.request.get('deckName')
		cards = self.request.get('deckData')
		name = users.get_current_user().nickname()
		player = Player.get_or_insert(name)
		deck = Deck()
		deck.name = deckName
		deck.cards = cards
		deck.user = player
		deck.put()
		pass
	def delete(self):
		deckName = self.request.get('deckName')
		deck = Deck.fetch
		
class Users(webapp2.RequestHandler):
	def get(self):
		user = users.get_current_user()
		name = user.nickname()
		player = Player.get_or_insert(name)
		decks = player.decks.fetch(limit=None)
		numDecks = len(decks)
		jsonDecks = []
		for d in decks:
			jsonDecks.append({'name': d.name, 'cards': d.cards})
		self.response.headers.add_header('content-type', 'application/json', charset='utf-8')
		self.response.out.write(json.dumps({'name': name, 'numDecks': numDecks, 'decks': jsonDecks}))

###############
## TEMPLATES ##
###############
class Main(webapp2.RequestHandler):
	def get(self):
		user = users.get_current_user()
		if user:
			self.response.out.write(template.render('envelope.html', {}))
		else:
			self.redirect(users.create_login_url(self.request.uri))

app = webapp2.WSGIApplication([('/cards', Cards),
							   ('/', Main),
							   ('/user', Users),
							   ('/decks', Decks)],
                              debug=True)