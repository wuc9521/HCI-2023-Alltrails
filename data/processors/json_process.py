import json

# 读取 JavaScript 文件
with open('../raw/Hunan.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

exclude = []

num = 0
for obj in data:

    print(obj['name'])
    file_name = '../path/hunan/' + obj['name'] + '.js'
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

# with open('../reformat/hunan.json', 'w', encoding='utf-8') as file:
#     json.dump(data, file, ensure_ascii=False)




