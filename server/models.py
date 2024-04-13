from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-created_at', '-updated_at', '-_password_hash', '-recipes.user')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    recipes = db.relationship('Recipe', back_populates='user')
    # favorite_categories = db.relationship('FavoriteCategory', back_populates= 'user')
    # recipes = association_proxy('favorite_categories', 'recipe')



    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        byte_object = password.encode('utf-8')
        bcrypt_hash = bcrypt.generate_password_hash(byte_object)
        hash_object_as_string = bcrypt_hash.decode('utf-8')
        self._password_hash = hash_object_as_string



    def __repr__(self):
        return f'<User id={self.id} username={self.username}>'


class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    serialize_rules = ('-user.recipes', '-categories.recipes', '-recipe_categories', 'categories',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    time_to_make = db.Column(db.Integer, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='recipes')

    recipe_categories = db.relationship('RecipeCategory', back_populates='recipe')
    categories = association_proxy('recipe_categories', 'category')

    # favorite_categories = db.relationship('FavoriteCategory', back_populates= 'recipe')
    # users = association_proxy('favorite_categories', 'user')


    def __repr__(self):
        return f'<user id= {self.id} title= {self.title} time_to_make= {self.time_to_make} ingredients= {self.ingredients} instructions= {self.instructions}>'

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    serialize_rules = ('-recipes.categories',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)

    recipe_categories = db.relationship('RecipeCategory',back_populates='category')
    recipes = association_proxy('recipe_categories', 'recipe')

    

class RecipeCategory(db.Model):
    __tablename__ = 'recipe_categories'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    recipe = db.relationship('Recipe', back_populates='recipe_categories')
    category = db.relationship('Category', back_populates='recipe_categories')

# class FavoriteRecipe(db.Model):
#     __tablename__ = 'favorite_categories'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

#     user = db.relationship('User', back_populates='favorite_categories')
#     recipe = db.relationship('Recipe', back_populates= 'favorite_categories')