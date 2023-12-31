from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Review(db.Model):
    __tablename__ = 'reviews'
    if environment == "production": __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("trails.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    date_submitted = db.Column(db.DateTime, nullable=False, default=date.today())
        
    user_rel = db.relationship("User", back_populates="review_rel")
    trail_rel = db.relationship("Trail", back_populates="review_rel")
    review_images_rel = db.relationship("ReviewImage", back_populates="review_rel", cascade="all, delete-orphan")
    
    
    def to_dict(self, includeImages=False):
        return {
            "id": self.id,
            "description": self.description,
            "rating": self.rating,
            "images": [review_image.to_dict() for review_image in self.review_images_rel] if includeImages else "",
            "date_submitted": self.date_submitted,
            "user": self.user_rel.to_dict(),
            "trail_id": self.trail_id,
            "user_id": self.user_id
        }
        
    def to_dict_no_item(self):
        return {
            "id": self.id,
            "description": self.description,
            "rating": self.rating,
            "date_submitted": self.date_submitted,
            "trail_id": self.trail_id,
            "user_id": self.user_id
        }