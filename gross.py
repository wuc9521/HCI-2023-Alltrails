import json

with open('./dataReformat/.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

num = 0
for obj in data:
    num += 1
print(num)