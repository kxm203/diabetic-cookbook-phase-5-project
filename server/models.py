from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-created_at', '-updated_at', '-_password_hash')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    recipes = db.relationship('Recipe', back_populates='user')

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

    serialize_rules = ('-user_id', '-user')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    time_to_make = db.Column(db.Integer, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='recipes')

    def __repr__(self):
        return f'<Recipe id={self.id} title={self.title} time_to_make={self.time_to_make} ingredients={self.ingredients} instructions={self.ingredients} user_id={self.user_id} user={self.user}>'

    #categories = db.relationship('Category', secondary='recipe_categories', backref='recipes')

# class Category(db.Model):
#     __tablename__ = 'categories'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=True)

#     recipes =db.relationship('Recipe', secondary='recipe_categories', backref='categories')

# class RecipeCategory(db.Model):
#     __tablename__ = 'recipe_categories'

#     recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), primary_key=True)
#     category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), primary_key=True)

#     recipe = db.relationship('Recipe', backref='recipe_categories')
#     category = db.relationship('Category', backref='recipe_categories')

