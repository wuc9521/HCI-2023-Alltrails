$$
\Huge{\textbf{Phaunos} \to \textbf{HCI@2023}}
$$

# 1. About

我们的共享文档: https://box.nju.edu.cn/group/17980/

请大家新建属于自己的分支, 不要直接提交到main分支

- 我使用的 node 版本是`16.20.0`
- 我修改了/react-app/package.json, 如果大家已经运行过 `npm install`, 请把 /node_modules 删掉, 重新运行一次 `npm install`.



# 2. Tech Stack

## 2.1. database: 

数据库使用 PostgreSQL, 具体来说使用 Python Alembic 来实现数据的管理和迁移.

> [这篇知乎](https://zhuanlan.zhihu.com/p/90106173)介绍了Python Alembic

原作者在 Phaunos 的 github wiki 中介绍了它这里数据库的schema, 如下图:

<img src="https://naturalifica.oss-cn-nanjing.aliyuncs.com/~/Users/wuchentian/SoloLearning/Blog/source/imgs/f59e3468dba6f325ddcc25c58998c260.png" alt="schema" style="zoom:70%;" />

我们在这里可以发现, 我们**还需要一个**和 `trails` 对应的表 `path` (好像叫外键还是什么来着....🤡)

`path` 表的元素和 `trails` 的元素一一对应, 并且标记了这条路径的起始地点, 结束地点, 以及一个列表的经度纬度高度等信息. 

这样的数据可以直接从alltrails官网上下载, 几乎可以下载成任何格式, 但是实践中我们发现使用 json 格式可能更方便.

> $\textbf{TODO}$: 需要一个人来爬取数据



## 2.2. backend

后端使用 flask

## 2.3. frontend

前端使用 react 框架, 还包括 react router; css3; redux.

# 3. Crawler

> 数据的爬取.



# -1. Phaunos

> project link is [**here**](https://github.com/dorianinc/Phaunos)

## -1.1. How to start project locally (old)

1. Clone the repo into a desired location
2. In the root folder run the following command to install dependencies for the backend (app folder) 
      ```bash
      pipenv install -r requirements.txt
      ```

3. ~~In the root directory create a '.env' file~~
4. ~~Copy over all the content from the 'example.env' to the '.env'~~
5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. cd into the 'react-app' folder run the following command to install dependencies for the frontend (react-app folder)
      ```bash
      npm install
      ```

7. ~~In the 'react-app' folder create a '.env' file~~
8. ~~Copy over all the content from the 'example.env' to the '.env'~~
9. From here you will need to get a key from [openweatherapi](https://openweathermap.org/api) and [googlemaps](https://console.cloud.google.com/google/maps-apis)
10. Take those keys and add them to the .env file



## -1.2. project Wiki

* [Feature List](https://github.com/dorianinc/Phaunos/wiki/Features-List)
* [Database Schema](https://github.com/dorianinc/01-AirBnB/wiki/Database-Schema)
* [Frontend Routes & Components](https://github.com/dorianinc/Phaunos/wiki/Front-End-Routes-&-Components)
* [Backend Routes](https://github.com/dorianinc/Phaunos/wiki/Back-End-Routes)
* [Redux Store State Shape](https://github.com/dorianinc/01-AirBnB/wiki/Redux-Store-Shape)







