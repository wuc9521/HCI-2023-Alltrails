import os

def rename_files_recursively(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file_name in files:
            # 去掉.js后缀，并添加.geojson后缀
            if file_name.endswith('.js'):
                new_file_name = f"{file_name[:-3]}"
            else:
                new_file_name = file_name

            # 生成新文件名，将空格、短横线和点号替换为下划线
            if new_file_name.endswith('.geojson'):
                new_file_name = new_file_name[:-8]
            new_file_name = new_file_name.replace(' ', '_').replace('-', '_').replace('.', '_').replace(',', '_')
            new_file_name = new_file_name + '.geojson'

            # 如果新文件名不同于旧文件名，则重命名文件
            if new_file_name != file_name:
                try:
                    old_path = os.path.join(root, file_name)
                    new_path = os.path.join(root, new_file_name)
                    os.rename(old_path, new_path)
                    print(f'Renamed: {old_path} -> {new_path}')
                except Exception as e:
                    print(f'Error renaming {file_name}: {e}')

if __name__ == "__main__":
    target_folder = '../path'

    rename_files_recursively(target_folder)
