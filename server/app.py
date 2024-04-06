#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify, make_response
from flask_restful import Resource
from flask_migrate import Migrate

# Local imports
from config import app, db, api, CORS
# Add your model imports
from models import User, Recipe#, RecipeCategory, Category
import ipdb

# Views go here!

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = [user.to_dict() for user in users]
        return make_response(jsonify(users_list), 200)

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

    def delete(self, id):
        user = User.query.get(id)
        if user:
            try:
                db.session.delete(user)
                db.session.commit()
                return {'message': 'User deleted successfully'}, 200
            except Exception as e:
                return {'error': str(e)}, 500
        else:
            return {'error': 'User not found'}, 404
   

api.add_resource(Users, '/users', '/users/<int:id>')

class Recipes(Resource):
    def get(self):
        recipes = Recipe.query.all()
        recipes_list = [recipe.to_dict() for recipe in recipes]
        return make_response(jsonify(recipes_list), 200)

    def post(self):
        data = request.json
        try:
            new_recipe = Recipe(
                title= data["title"],
                time_to_make=data["time_to_make"],
                ingredients=data["ingredients"],
                instructions=data["instructions"],
                user_id=data["user_id"],
                )  
            db.session.add(new_recipe)
            db.session.commit()
            
            response =  make_response(new_recipe.to_dict(), 201)
            return response
        except KeyError as e:
            return make_response({'error': f'Missing field: {e}'}, 400)
        except Exception as e: 
            return make_response({'error': "Could not create new recipe"}, 400)

api.add_resource(Recipes, '/recipes')


    


if __name__ == '__main__':
    app.run(port=5555, debug=True)

