import pickle
import tflearn

import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy as np
import tensorflow as tf
import random
import json

from textblob import TextBlob

def clean_up_sentence(sentence):
	sentence_words = nltk.word_tokenize(sentence)
	sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
	return sentence_words

def bow(sentence, words, show_details=False):
	sentence_words = clean_up_sentence(sentence)
	bag = [0]*len(words)  
	for s in sentence_words:
		for i,w in enumerate(words):
			if w == s: 
				bag[i] = 1
				if show_details:
					print ("found in bag: %s" % w)

	return(np.array(bag))

ERROR_THRESHOLD = 0.25
def classify(sentence):
	results = model.predict([bow(sentence, words)])[0]
	results = [[i,r] for i,r in enumerate(results) if r>ERROR_THRESHOLD]
	results.sort(key=lambda x: x[1], reverse=True)
	return_list = []
	for r in results:
		return_list.append((classes[r[0]], r[1]))
	return return_list


data = pickle.load( open( "training_data", "rb" ) )
words = data['words']
classes = data['classes']
train_x = data['train_x']
train_y = data['train_y']

import json
with open('test.json') as json_data:
	intents = json.load(json_data)



net = tflearn.input_data(shape=[None, len(train_x[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(train_y[0]), activation='softmax')
net = tflearn.regression(net)

# Define model and setup tensorboard
model = tflearn.DNN(net, tensorboard_dir='tflearn_logs')
model.load('./model.tflearn')

with open('states.json') as json_data:
	state_schema = json.load(json_data)

# state variables
happy       = None
counselling = None
counsellor  = None
date_time   = None
student     = None

states = list(state_schema)
state = state_schema[states[0]]["state"]

for i in states:
	state = state_schema[i]
	if(state["state"]==0):
		print(state["prompt"])
		temp = input()
		senti = TextBlob(temp).sentiment.polarity
		if(senti>0):
			print(state["P"])
			happy = True
		else:
			print(state["N"])
			happy = False
	elif(state["state"] == 1):
		print(state["prompt"])
		temp = input()
		yorn = classify(temp)[0][0]
		if(yorn == "yes"):
			counselling = True
			print("Ok! booking appointment")
		elif(yorn == "maybe"):
			counselling = True
			print(state["M"])
		else:
			counselling = False
			print(state["N"])
			break
	elif(state["state"] == 2):
		print(state["prompt"])
		for i in state["counsellors"]:
			counsellor = state["counsellors"][i]
			print(counsellor["name"], counsellor["day"], counsellor["time"])
		counsellor = input()
	elif(state["state"] == 3):
		print(state["prompt"])
		date_time = input()
	elif(state["state"] == 4):
		print(state["prompt"])
		student = input()




# while(True):

# 	if(state==0):
# 		temp = input()
# 		senti = TextBlob(temp).sentiment.polarity
# 		if(senti>0):
# 			happy = True
# 		else:
# 			happy = False
# 		state = 1
# 	else:
# 		print("",end="")
# 		temp = input()
# 		if(classify(temp)[0][0] == "yes"):

