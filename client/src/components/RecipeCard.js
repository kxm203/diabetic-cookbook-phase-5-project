import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, addToFavorites }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsFavorite(!isFavorite);
        if (addToFavorites) {
            addToFavorites(recipe);
        }
        if (isFavorite) {
            navigate('/recipes/favorite');
        }
    };

    return (
        <li className="card" data-testid="recipe-item">
            <h4>{recipe.title}</h4>
            <p>Time to Make in Minutes: {recipe.time_to_make}</p>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Instructions: {recipe.instructions}</p>
            <p>Categories: {recipe.categories}</p>
            {isFavorite ? (
                <button className="primary favorite-btn" onClick={handleClick}>❤️</button>
            ) : (
                <button className="unfavorite-btn" onClick={handleClick}>🩶</button>
            )}
        </li>
    );
}

export default RecipeCard;