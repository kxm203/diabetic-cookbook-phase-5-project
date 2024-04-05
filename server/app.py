#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify, make_response
from flask_restful import Resource
from flask_migrate import Migrate

# Local imports
from config import app, db, api, CORS
# Add your model imports
from models import User, Recipe#, RecipeIngredient, RecipeCategory, Category
import ipdb

# Views go here!

class Users(Resource):
    def post(self):
        data = request.json
        try:
            user = User(username = data['username'])
            user.password_hash = data['password']

            db.session.add(user)
            db.session.commit()

            response = make_response(user.to_dict(), 201)
        except:
            return make_response({'error': "oops, something was wrong"}, 400)

        return response
   

api.add_resource(Users, '/users')

class Recipes(Resource):
    def get(self):
        repsonse_dict_list = [r.to_dict() for r in Recipe.query.all()]
        response = make_response(
            jsonify(response_dict_list),
            200,
        )
        return response

    def post(self):
        data = request.get_json()
        new_recipe = Recipe(
            title= data["title"],
            time_to_make=["time_to_make"],
            instructions=["instructions"],
            categories=["categories"],
        )
        db.session.add(new_recipe)
        db.session.commmit()

        reponse_dict=new_recipe.to_dict()
        response = make_response(
            jsonify(response_dict),
            201,
        )
        return response
api.add_resource(Recipes, '/recipes')
    


if __name__ == '__main__':
    app.run(port=5555, debug=True)

