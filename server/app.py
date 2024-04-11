#!/usr/bin/env python3
from flask import Flask, request, jsonify, make_response, session
from flask_restful import Resource
from flask_migrate import Migrate

from config import app, db, api, CORS
from models import User, Recipe, Category, RecipeCategory
import ipdb

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
            categories = [int(category) for category in data["categories"]]
            categories = Category.query.filter(Category.id.in_("categories")).all()
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
                for recipe_category in recipe.recipe_categories:
                    db.session.delete(recipe_category)

                db.session.delete(recipe)
                db.session.commit()
                return {'message': 'Recipe deleted successfully'}, 200
            except Exception as e:
                return {'error': str(e)}, 500
        else:
            return {'error': 'Recipe not found'}, 404

api.add_resource(Recipes, '/recipes', '/recipes/<int:id>')



    


if __name__ == '__main__':
    app.run(port=5555, debug=True)

