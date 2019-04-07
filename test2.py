import json
import itertools

f = open("states.json")
data = json.load(f)
# fwrite = open("test.txt",'w')
variables = []

temp = sorted(data.items(), key = lambda k:k[1]["priority"])
dic = {}
for i in temp:
	dic[i[0]] = i[1]

data = dic

for k in data:
	variables.append({"name":k,"data":data[k]})
	temp = data[k]

lis = []
for i in variables:
	if(i["data"]["type"]=="bool"):
		lis.append(i["data"]["val"])
	elif(i["data"]["type"]=="range"):
		lis.append(i["data"]["val"])
	elif(i["data"]["type"]=="string"):
		lis.append([i["data"]["val"]])
	elif(i["data"]["type"]=="number"):
		lis.append([i["data"]["val"]])
	elif(i["data"]["type"]=="str_list"):
		lis.append(i["data"]["val"])

lis = list(itertools.product(*lis))
for j in range(len(lis)):
	for i in range(len(variables)):
		print(variables[i]["name"]+"?")
		print(lis[j][i])

# fwrite.close()