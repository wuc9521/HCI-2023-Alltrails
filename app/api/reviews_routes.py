from flask import Blueprint, request, make_response, jsonify
from flask_login import login_required, current_user
from ..models import db, Review
from ..forms import ReviewForm

reviews_routes = Blueprint("reviews", __name__)

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
#------------------------------------------------------------------------------------#

@reviews_routes.route("/<int:review_id>")
def get_review_by_id(review_id):
    """ Get single review by id """
    review = Review.query.get(review_id)
    if not review:
        error = make_response("Review does not exist")
        error.status_code = 404
        return error
    return review.to_dict(includeImages=True)

@reviews_routes.route("", methods=["PUT"])
def edit_review():
    """ Edit a single review """
    user = current_user.to_dict()
    data = request.get_json()

    #------------ validation -------------#    
    review = Review.query.get(data["reviewId"])
    if not review:
        error = make_response("Review does not exist")
        error.status_code = 404
        return error
    
    review_dict = review.to_dict(includeImages=True)
    if int(review_dict["user_id"]) != user["id"]:
        error = make_response("Only the creator of a review can edit a review")
        error.status_code = 401
        return error
    #--------------------------------------#  
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        
        data = form.data
        review.description = data["description"]
        review.rating = data["rating"]
        db.session.commit()
        return review.to_dict(includeImages=True)
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401    


@reviews_routes.route("", methods=["DELETE"])
def delete_review():
    """ Delete a single review """
    user = current_user.to_dict()
    data = request.get_json()
    #------------ validation -------------#    
    review = Review.query.get(data["reviewId"])
    if not review:
        error = make_response("Review does not exist")
        error.status_code = 404
        return error
    
    review_dict = review.to_dict()
    if int(review_dict["user_id"]) != user["id"]:
        error = make_response("Only the creator of a review can delete a review")
        error.status_code = 401
        return error
    #--------------------------------------#  
    
    db.session.delete(review)    
    db.session.commit()
    res = make_response({"message": "Successfully deleted"})
    res.status_code = 200
    return res
    