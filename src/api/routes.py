"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

#Signup: The user must be able to pick its email, any password and submit the form, a new user must be created in the database and the user must be redirected to the login form afterwards.
@api.route('/singup', methods=['POST'])
def singup():
    body = request.json
    email = body.get("email")
    password = body.get("password")
    
    if email is None or password is None:
        return({"message":"bad credentials"})

    user = User.query.filter_by(email=email).one_or_none()

    if user is not None:
        return({"message":"user already exists"}), 400
    else:
        password = generate_password_hash(password)
        add_user = User(email=email, password=password)
        db.session.add(add_user)

    try:
        db.session.commit()
        return jsonify({"message":"user created"}), 201
    except Exception as error:
        db.session.rollback()
        return({"error":f"{error}"}), 500

@api.route('/login', methods=['POST'])
def login():
    body = request.json
    email = body.get("email")
    password = body.get("password")

    user_exists = User.query.filter_by(email=email).one_or_none()
    if user_exists is None:
        return({"message":"bad credentials"}), 400
    else:
        if check_password_hash(user_exists.password, password):
            token = create_access_token(identity=user_exists.id)
            return({"token":f"{token}"})
        else:
            return({"message":"bad credentials"}), 400
    

