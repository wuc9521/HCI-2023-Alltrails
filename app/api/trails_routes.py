from ast import FunctionDef
from collections import defaultdict
from operator import or_
from flask import Blueprint, request, make_response, jsonify
from flask_login import login_required, current_user
from ..models import db, Trail, Review, Bookmark
from ..forms import ReviewForm
from sqlalchemy.sql.expression import func

trails_routes = Blueprint("trails", __name__)

#-----------------------------helper function---------------------------------------#
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[f"{field}"] = f"{error}"
    return errorMessages


@trails_routes.route('/search', methods=['POST'])
def search_trails():
    query = request.data.decode('utf-8')  # 获取搜索关键字

    # 分割关键字成为一个关键字列表
    keywords = query.split()

    # 创建一个默认值为0的字典来统计每个Trail的出现次数
    trail_counts = defaultdict(int)

    # 遍历每个关键字
    for keyword in keywords:
        # 在数据库中执行模糊查询
        trails = Trail.query.filter(
            or_(
                or_(
                    or_(
                        Trail.name.ilike(f"%{keyword}%"),
                        Trail.city.ilike(f"%{keyword}%")
                        ),
                    or_(
                        Trail.park.ilike(f"%{keyword}%"),
                        Trail.state.ilike(f"%{keyword}%")
                        )
                ),
                Trail.country.ilike(f"%{keyword}%")
            )
        ).all()
        # 将每个Trail的出现次数加1
        for trail in trails:
            trail_counts[trail] += 1

    # 根据出现次数倒序排序Trails
    sorted_trails = sorted(trail_counts.keys(), key=lambda trail: trail_counts[trail], reverse=True)

    # 将排序后的结果转换为字典列表
    results = [trail.to_dict() for trail in sorted_trails]

    return jsonify(query=query, results=results), 200

@trails_routes.route("")
def get_all_trails():
    """"Get all trails"""
    trails = Trail.query.all()
    return [trail.to_dict(includeImages=True) for trail in trails]

@trails_routes.route("/<int:trail_id>")
def get_trail_by_id(trail_id):
    """"Get single trail by id"""
    trail = Trail.query.get(trail_id)
    if not trail:
        error = make_response("Trail does not exist")
        error.status_code = 404
        return error
    return trail.to_dict(includeImages=True, includeReviews=True)

@trails_routes.route("/<int:trail_id>/reviews")
def get_reviews_by_trail_id(trail_id):
    """ Get all reviews of specific trail """
    reviews = Review.query.filter(Review.trail_id == trail_id).all()
    return [review.to_dict(includeImages=True) for review in reviews]

@trails_routes.route("/<int:trail_id>/reviews", methods=["POST"])
@login_required
def create_a_review(trail_id):
    """"Create a review for a trail"""
    user = current_user.to_dict()
    
    #------------ validation -------------#
    trail = Trail.query.get(trail_id)
    if not trail:
        error = make_response("Trail does not exist")
        error.status_code = 404
        return error
    
    trail_dict = trail.to_dict(includeImages=True, includeReviews=True)
    for review in trail_dict["reviews"]:
        if int(review["user_id"]) == user["id"]:
            return {"errors": {"review":"You already have a review for this trail"}}, 400
    #--------------------------------------#  
           
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        
        data = form.data
        new_review = Review(
            description=data["description"],
            rating=data["rating"],
            trail_id=trail_dict["id"],
            user_id=user["id"]
        )
        
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400