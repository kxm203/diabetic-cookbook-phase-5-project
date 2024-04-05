import React from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }) {
    return (
        <ul className="recipes">
            {recipes.map((recipe) => (
                <RecipeCard key={recipes.id} recipe={recipe} />
            ))}
        </ul>
    );
}

export default RecipeList;