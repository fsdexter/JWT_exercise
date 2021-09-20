"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    password_hash = generate_password_hash(password, "sha256")
    user_checked = User.query.filter_by(email = email).one_or_none()
  
    # to check the user existence
    if email == None or password == None:
        return jsonify({"msg": "Bad email or password"}), 401
   
    # to check email and password
    if not user_checked or check_password_hash(password_hash, "wrong-passw@rd"):
        return jsonify("Your credentials are wrong, please try again"), 401

    access_token = create_access_token(identity = user_checked.serialize())
    #access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200


    #cola
    #body_request = request.get_json()
    # New token
    #return jsonify({"access_token": access_token, "user": user_checked.serialize()}), 200





@api.route("sing_up", methods=["POST"])
def sing_up_user():
 
    body_request = request.get_json()
    
    email_request = body_request.get("email", None)
    password_request = body_request.get("password", None)
        
    new_user = User(
        email = email_request, 
        password = generate_password_hash(password_request, "sha256")
        )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(body_request), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():

    response_body = {
        "message": "SECRET"
    }

    return jsonify(response_body), 200
    # Access the identity of the current user with get_jwt_identity
    #current_user = get_jwt_identity()
    #return jsonify(logged_in_as=current_user), 200

