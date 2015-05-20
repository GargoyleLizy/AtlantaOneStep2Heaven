#==== header here ===================================================
# Team 16 - city: Atlanta
# Student number: 656982 | Student name: Zhenya Li    | Surname: Li 
# Student number: 616805 | Student name: Meng Li      | Surname: Li
# Student number: 650382 | Student name: Ming Yu      | Surname: Chang
# Student number: 548771 | Student name: Hao Duan     | Surname: Duan
# Student number: 629341 | Student name: Yu Sun       | Surname: Sun
# Student number: 705077 | Student name: Yuxiang Zhou | Surname: Zhou
# ===================================================================

from pattern.en import sentiment
from time import sleep
import json
import inspect
import couchdb
from couchdb.design import ViewDefinition
import sys

USERNAME = ''
PASSWORD = ''
TARGET_URL = '127.0.0.1'
TARGET_DB = 'tweet_db'

if (USERNAME == '') or (PASSWORD == ''):
	COUCH_SERVER = 'http://'+TARGET_URL+':5984/'
else:
	COUCH_SERVER = 'http://'+USERNAME+':'+PASSWORD+'@'+TARGET_URL+':5984/'


emotionDict = {}

# load the dictionary
with open('emotionDict', 'r') as f:
	emotionDict = json.loads(f.readline())
	print emotionDict


# calculate the sentiment score,return a score
def getScore(tweets, emotionDict):

	# get the basic Score for text of tweets
	basicScore = sentiment(tweets)[0]

	# store the
	emotionScore = 0
	emotionNumber = 0

	# retrivel the Dictionary find the corresponding adjective
	for key in emotionDict.keys():
		if key in tweets:
			emotionScore = emotionScore + sentiment(emotionDict[key])[0]
			emotionNumber += 1

	if emotionNumber == 0:
		return basicScore
	else:
		finalScore = (basicScore + emotionScore / emotionNumber) / 2
		return finalScore


##################################################
# ================================ I dont know 
for name, obj in inspect.getmembers(couchdb):
    if inspect.isclass(obj):
        print obj
# ===================================

server = couchdb.Server(COUCH_SERVER)
db = server[TARGET_DB]
DB_LEN = len(db)
#print DB_LEN
cnt = 0
percentage = 0
for id in db:
    doc = db[id]
    if 'sentiment' not in doc:
        doc['sentiment'] = getScore(doc['text'],emotionDict) # plus code here#
        db[id] = doc
    cnt += 1

    if int(round((float(cnt)/float(DB_LEN))*100)) >= percentage:
    	#print percentage
    	percentage = int(round((float(cnt)/float(DB_LEN))*100))
    	sys.stdout.write('\r')
    	# the exact output you're looking for:
    	sys.stdout.write("[%-20s] %d%%" % ('='*percentage, percentage))
    	sys.stdout.flush()
