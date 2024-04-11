#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Category

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed for categories...")
        # Seed code goes here!
        categories_data = [
            {"name": "Low-carb"},
            {"name": "Sugar-free"},
            {"name": "Vegetarian"},
        ]

        for category_info in categories_data:
            category = Category(**category_info)
            db.session.add(category)

        db.session.commit()
        print("Seed for categories completed successfully!")