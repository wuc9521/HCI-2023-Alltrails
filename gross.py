import json

with open('', 'r', encoding='utf-8') as file:
    data = json.load(file)

num = 0
for obj in data:
    num += 1