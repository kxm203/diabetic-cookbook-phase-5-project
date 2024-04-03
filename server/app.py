#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify, make_response
from flask_restful import Resource
from flask_migrate import Migrate

# Local imports
from config import app, db, api, CORS
# Add your model imports
from models import User, RecipeIngredient, Recipe, RecipeCategory, Category


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
   pass

api.add_resource(Users, '/users')
    


if __name__ == '__main__':
    app.run(port=5555, debug=True)

