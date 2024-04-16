import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, addRecipe, handleDelete, handleUpdate }) {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    const addToFavorites = (recipe) => {
        setFavoriteRecipes([...favoriteRecipes, recipe]);
    };

    return (
        <ul className="recipes">
            {recipes.map((recipe) => (
                <RecipeCard 
                    key={recipe.id}
                    recipe={recipe} 
                    addToFavorites={addToFavorites} 
                    addRecipe={addRecipe} 
                    handleDelete={handleDelete} 
                    handleUpdate={() => handleUpdate(recipe.id)}
                />
            ))}
        </ul>
    );
}

export default RecipeList;