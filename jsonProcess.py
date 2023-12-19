import json

# 读取 JavaScript 文件
with open('./data/Shanghai.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

num = 0
for obj in data:
    obj['country'] = 'China'
    print(obj['name'])
    file_name = './data/shanghai/' + obj['name'] + '.js'
    with open(file_name, 'r') as tfile:
        js_code = tfile.read()
        js_data = json.loads(js_code)
        if num != 10 and num != 12 and num != 15 and num != 17 :
            lat = js_data['features'][0]['geometry']['coordinates'][0][0][0]
            lng = js_data['features'][0]['geometry']['coordinates'][0][0][1]
            obj['lat'] = lat
            obj['lng'] = lng
            print(num)
            # print("lat:",lat)
            # print("lng:",lng)
            # print("-------------------------------")
        else:
            lat = js_data['features'][0]['geometry']['coordinates'][0]
            lng = js_data['features'][0]['geometry']['coordinates'][1]
            obj['lat'] = lat
            obj['lng'] = lng
            print(num)
            # print("lat:", lat)
            # print("lng:", lng)
            # print("-------------------------------")
        num += 1

with open('dataReformat/shanghai.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False)

# 获取某个项的值
# name = js_data['features'][0]['geometry']['coordinates'][0][0][1]

# 打印结果

