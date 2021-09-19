import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
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

@api.route('/singup', methods=['POST', 'GET'])
def singing():
    # The create_access_token() function is used to actually generate the JWT.


    body_request = request.get_json()
    email = body_request.get("email", None)
    password = body_request.get("password", None)
    access_token = create_access_token(identity=email)
    
    new_user = User(
        email = email,
        password = access_token
    )
    
    db.session.add(new_user)
    db.session.commit()


    return jsonify(access_token=access_token), 200


    