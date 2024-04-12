import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, addRecipe }) {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    const addToFavorites = (recipe) => {
        setFavoriteRecipes([...favoriteRecipes, recipe]);
    };
    console.log(recipes)
    return (
        <ul className="recipes">
            {recipes.map((recipe) => (
                <RecipeCard key={recipes.id} recipe={recipe} addToFavorites={addToFavorites} addRecipe={addRecipe}/>
            ))}
        </ul>
    );
}

export default RecipeList;