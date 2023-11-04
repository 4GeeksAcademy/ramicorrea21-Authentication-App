"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)


@api.route('/singup', methods=['POST'])
def singup():
    body = request.json

    email = body.get('email')
    password = body.get('password')

    if email is None or password is None:
        return({"message":"Bad credentials"}), 400
    
    User = User.query.filter_by(email=email).one_or_none()
    if User is not None:
        return({"message":"user already exists"})
    else:
        password = generate_password_hash(password)
        add_user = User(email=email, password=password)
        db.session.add(add_user)

    try:
        db.session.commit()
        return({"message":"user created"}), 201
    except Exception as error:
        db.session.rollback()
        return({"error":f"{error}"})
    

@api.route('/health_check', methods=['GET'])
def health_check():
    return jsonify({"message":"good"})