# Diabetic CookBook Phase-5 Project
---

## Introduction

My project is making a diabetic cookbook that will give the user low carb options to help with regulating blood sugar.

What I want to give the user is when they log into the website they will be able to see all of the recipes that have been on/added to the page.

When the user is logged in they will be able to add their own recipes to the website.

If the user likes a recipe, they can add it to their favorite and then be able to look at them on a different route.

If a user has admin access they will be able to delete recipes.

I will implement a search bar so users can find recipes quicker.

Implement a "forgot password" feature, so the user can reset their password.





.
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── app.py
    ├── config.py
    ├── models.py
    └── seed.py
```
So far here are the components I think I need:
App (main front end component)
Login/Singup Welcome page
Header component
Main Recipe Page (parent) - view favorite recipe page and add new recipe page (children)

For the back end here are some models:
User 
Recipe
Catagories
Time of Day (breakfast, lunch, dinner)
Comments (if I need to combine catagories and time of day)

My many to many is there can be many recipes to many categories and I want my one to many be the one user to many recipes.

I will also implement validations and error handling to the back end and also look at Formik.

For CSS, I am going to look at Bootstrap 



