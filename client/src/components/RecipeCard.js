import React, { useEffect, useState, } from "react";

function RecipeCard({ recipe, toggleFavoriteStatus }) {
    const [isFavorite, setIsFavorite] = useState(true);

    const handleClick = () => {
        setIsFavorite(!isFavorite);
        toggleFavoriteStatus(recipe.id);
    };

    return (
        <li className="card" data-testid="recipe-item">
            <h4>{recipe.title}</h4>
            <p>Time to Make: ${recipe.timeToMake}</p>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Instructions: ${recipe.instructions}</p>
            <p>Categories: ${recipe.categories}</p>
            {isFavorite ? (
                <button className="primary" onClick={handleClick}>🩶</button>
            ) : (
                <button onClick={handleClick}>❤️</button>
            )}
        </li>
    );
}

export default RecipeCard;