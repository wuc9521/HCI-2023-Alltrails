from sqlite3 import IntegrityError
from ..models import db, Trail, environment, SCHEMA
from sqlalchemy.sql import text
import json
import os
filename = './app/traildata.json'
print(os.getcwd())
with open(filename, 'r', encoding='utf-8') as file:
    data = json.load(file)
seed_data = []
for item in data:
    country = item["country"]
    lat = item["lat"]
    lng = item["lng"]
    link = item["link"]
    name = item["name"]
    park = item["park"]
    city = item["city"]
    state = item["state"]
    difficulty = item["difficulty"]
    length = item["length"]
    elevation = item["elevation"]
    route_type = item["route_type"]
    description = item["description"]

    item_dict = {
          "name": name,
          "park": park,
          "city": city,
          "state": state,
          "country": country,
          "lat": lat,
          "lng": lng,
          "difficulty": difficulty,
          "length": length,
          "elevation": elevation,
          "route_type": route_type,
          "description": description,
          "attractions": "null",
          "activities": "null",
          "suitability": "null",
       }
    seed_data.append(item_dict)



# @with_appcontext
from sqlalchemy.exc import IntegrityError

def seed_trails(app):
    with app.app_context():
        for data in seed_data:
            trail = Trail(**data)
            db.session.add(trail)
            try:
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                # 唯一性冲突，进行替换重复记录
                existing_trail = Trail.query.filter_by(name=trail.name).first()
                existing_trail.park = trail.park
                existing_trail.city = trail.city
                existing_trail.state = trail.state
                existing_trail.country = trail.country
                existing_trail.lat = trail.lat
                existing_trail.lng = trail.lng
                existing_trail.difficulty = trail.difficulty
                existing_trail.length = trail.length
                existing_trail.elevation = trail.elevation
                existing_trail.route_type = trail.route_type
                existing_trail.description = trail.description
                db.session.commit()
                print(f"重复记录已替换：{trail.name}")

# @with_appcontext
def undo_trails(app):
    with app.app_context():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.trails RESTART IDENTITY CASCADE;"
            )
        else:
            db.session.execute(text("DELETE FROM trails"))

        db.session.commit()
