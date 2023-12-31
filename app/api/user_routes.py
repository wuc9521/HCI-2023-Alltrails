from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from flask_login import current_user, login_required
from ..api.aws_helpers import (get_unique_filename,upload_file_to_s3,remove_file_from_s3)
from ..models import db, User
from ..forms import UserForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('', methods=["PUT"])
@login_required
def add_user_image():
    """Add user image"""
    form = UserForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        data = form.data
        image = data["profile_pic"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        
        if "url" not in upload:
            return upload["errors"]
        
        current_user.profile_pic = upload["url"]
        db.session.commit()
        return jsonify(current_user.to_dict())
        
        
    else:
        return form.errors
    
@user_routes.route('', methods=["DELETE"])
@login_required
def remove_user_image():
    """remove user image"""
    user = current_user.to_dict()

    profile_pic = user["profile_pic"]
    # deleted_pic = remove_file_from_s3(profile_pic)
    current_user.profile_pic = None
    
    db.session.commit()
    return jsonify(current_user.to_dict())

@user_routes.route('/follows', methods=["POST"])
@login_required
def follow_user():
    """follow a user"""
    other_user = User.query.get(request.get_json())
    other_user.followers.append(current_user)
    
    db.session.commit()
    return current_user.to_dict()

@user_routes.route('/follows', methods=["DELETE"])
@login_required
def unfollow_user():
    """unfollow a user"""
    other_user = User.query.get(request.get_json())
    current_user.following.remove(other_user)
    
    db.session.commit()
    return current_user.to_dict()