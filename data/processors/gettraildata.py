import json
import os

# 清空 traildata.json 文件
def clear_traildata_file():
    with open('./app/traildata.json', 'w') as file:
        file.write('[]')

# 读取 reformt 文件夹下的所有 JSON 文件并拼接成新的 traildata.json
def merge_json_files():
    merged_data = []
    folder_path = './data/reformat'  # reformt 文件夹路径

    # 遍历 reformt 文件夹下的所有文件
    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):
            file_path = os.path.join(folder_path, filename)

            # 读取当前文件的 JSON 数据
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)

            # 将当前文件的数据添加到拼接列表中
            merged_data.extend(data)

    # 将拼接后的数据写入新的 traildata.json 文件
    with open('./app/traildata.json', 'w', encoding='utf-8') as file:
        json.dump(merged_data, file, indent=2)

# 按顺序运行脚本
clear_traildata_file()
merge_json_files()