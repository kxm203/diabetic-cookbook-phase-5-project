# Diabetic CookBook Phase-5 Project
---

## Introduction

My project is making a diabetic cookbook that will give the user low carb options to help with regulating blood sugar.

What I want to give the user is when they log into the website they will be able to see all of the recipes that have been on/added to the page.

When the user is logged in they will be able to add their own recipes to the website.

**If the user likes a recipe, they can add it to their favorite and then be able to look at them on a different route.(I have not completed this yet)

A user can update and delete recipes.

I will implement a search bar so users can find recipes quicker.

**Implement a "forgot password" feature, so the user can reset their password. (I have not completed this yet.)



So far here are the components I think I need:
App (main front end component)
Login/Signup Welcome page
Logout
Header
ErrorPage
Main Recipe Page (parent)
NewRecipeForm
RecipeCard
RecipeList
Search
UpdateRecipeForm
FavoritesPage

There is an index.js with router.js housing the routes.

There is index.css for front end styling.



For the back end here are some models:
User 
Recipe
Category
RecipeCategory (a join between Recipe and Category)
FavoriteRecipe (a join between User and Recipe)


My many to many is there can be many recipes to many categories and I want my one to many be the one user to many recipes.

I will also implement validations and error handling to the back end and also look at Formik.

For CSS, I am going to look at Bootstrap and just manually using css.

On the backend I used POSTman to help validate and check for backend errors.

Anyone is welcome to see this project and help out in anyway!  (After 4/19/2024)

**I DO NOT HAVE ANY RECIPES IN SEED.PY SO IF YOU PULL THIS JUST ADD A RECIPE FIRST.**



