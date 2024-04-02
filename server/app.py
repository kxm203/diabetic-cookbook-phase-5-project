#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request
from flask_restful import Resource
from flask_migrate import Migrate

# Local imports
from config import app, db, api, CORS
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

