$$
\Huge{\textbf{Phaunos} \to \textbf{HCI@2023}}
$$

# 1. TODOs

- [x] fetch data.
- [x] database modify.
- [x] backend search.
- [ ] frontend search.
- [ ] modifying all styles.


# 2. Tech Stack

## 2.1. database: 

数据库使用 PostgreSQL, 具体来说使用 Python Alembic 来实现数据的管理和迁移.

> [这篇知乎](https://zhuanlan.zhihu.com/p/90106173)介绍了Python Alembic


## 2.2. backend

后端使用 flask

## 2.3. frontend

前端使用 react 框架, 还包括 react router; css3; redux.


# -1. start project locally

1. Clone the repo into a desired location
2. In the root folder run the following command to install dependencies for the backend (app folder) 
      ```bash
      pipenv install -r requirements.txt
      ```

3. ~~In the root directory create a '.env' file~~
4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

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

5. cd into the 'react-app' folder run the following command to install dependencies for the frontend (react-app folder)
      ```bash
      npm install
      ```

6. In the 'react-app' folder create a '.env' file
7. Copy over all the content from the 'example.env' to the '.env'
8. From here you will need to get a key from [openweatherapi](https://openweathermap.org/api) and [googlemaps](https://console.cloud.google.com/google/maps-apis)
9. Take those keys and add them to the .env file

