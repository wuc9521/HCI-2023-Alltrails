import json

# 读取 JavaScript 文件
with open('dataReformat/shanghai.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

for obj in data:
    temp = obj['lat']
    obj['lat'] = obj['lng']
    obj['lng'] = temp

with open('dataReformat/shanghai.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False)
