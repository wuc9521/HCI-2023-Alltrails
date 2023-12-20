import json

# 读取 JavaScript 文件
with open('./data/Yunnan.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

exclude = [2,6,10,13,14,16,18,26,28,29,31,37]

num = 0
for obj in data:
    obj['country'] = 'China'
    print(obj['name'])
    file_name = './data/yunnan/' + obj['name'] + '.js'
    with open(file_name, 'r') as tfile:
        js_code = tfile.read()
        js_data = json.loads(js_code)
        if num not in exclude:
            lat = js_data['features'][0]['geometry']['coordinates'][0][0][1]
            lng = js_data['features'][0]['geometry']['coordinates'][0][0][0]
            obj['lat'] = lat
            obj['lng'] = lng
            print(num)
            print("lat:",lat)
            print("lng:",lng)
            print("-------------------------------")
        else:
            lat = js_data['features'][0]['geometry']['coordinates'][1]
            lng = js_data['features'][0]['geometry']['coordinates'][0]
            obj['lat'] = lat
            obj['lng'] = lng
            print(num)
            print("lat:", lat)
            print("lng:", lng)
            print("-------------------------------")
        num += 1

with open('dataReformat/yunnan.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False)




