#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify, make_response, session
from flask_restful import Resource
from flask_migrate import Migrate

# Local imports
from config import app, db, api, CORS
# Add your model imports
from models import User, Recipe, Category, RecipeCategory, Favorite
import ipdb

# Views go here!

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = [user.to_dict() for user in users]
        return make_response(jsonify(users_list), 200)

    def post(self, login=None):
        data = request.json
        try:
            user = User(username = data['username'])
            user.password_hash = data['password']
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
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

    def validate_login(self, username, password):
        user = User.query.filter_by(username=username).first()
        if user and user.verify_password(password):
            return True
        return False

   

api.add_resource(Users, '/users', '/users/<int:id>', '/login')

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
                user_id=session.get("user_id"),
            )  
            
            categories = Category.query.filter(Category.id.in_(data["categories"])).all()
            new_recipe.categories = categories
            db.session.add(new_recipe)
            db.session.commit()
            
            response =  make_response(new_recipe.to_dict(), 201)
            return response
        except KeyError as e:
            return make_response({'error': f'Missing field: {e}'}, 400)
        except Exception as e: 
            return make_response({'error': "Could not create new recipe"}, 400)

    def patch(self, id):
        recipe = Recipe.query.get(id)
        if not recipe:
            return {'error': 'Recipe not found'}, 404

        data = request.json
        if 'categories' in data:
            data['categories'] = data['categories'].split(',')
            categories = Category.query.filter(Category.id.in_(data["categories"])).all()
            recipe.categories = categories

        for attr in data:
            if hasattr(recipe, attr):
                setattr(recipe, attr, data[attr])
        db.session.commit()
        return recipe.to_dict(), 200

    def delete(self, id):
        recipe = Recipe.query.get(id)
        if recipe:
            try:
                db.session.delete(recipe)
                db.session.commit()
                return {'message': 'Recipe deleted successfully'}, 200
            except Exception as e:
                return {'error': str(e)}, 500
        else:
            return {'error': 'Recipe not found'}, 404

api.add_resource(Recipes, '/recipes', '/recipes/<int:id>')

@app.route('/favorites', methods=['POST'])
def add_favorite():
    user_id = session.get('user_id')
    recipe_id = request.json['recipe_id']
    user = User.query.get(user_id)
    recipe = Recipe.query.get(recipe_id)
    user.add_favorite(recipe)
    return jsonify({'message': 'Recipe favorited'}), 201

@app.route('/favorites/<int:recipe_id>', methods=['DELETE'])
def remove_favorite(recipe_id):
    user_id = session.get('user_id')
    user = User.query.get(user_id)
    recipe = Recipe.query.get(recipe_id)
    user.remove_favorite(recipe)
    return jsonify({'message': 'Recipe unfavorited'}), 200
    


if __name__ == '__main__':
    app.run(port=5555, debug=True)

