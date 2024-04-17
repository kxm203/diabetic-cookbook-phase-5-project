import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, handleUpdate, handleDelete }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsFavorite(!isFavorite);
        if (addToFavorites) {
            addToFavorites(recipe);
        }
        if (isFavorite) {
            navigate('/recipes/favorite', {state: { recipe } });
        }
    };
    const addToFavorites = async (recipe) => {
        try {
            const resp = await fetch('/recipes/favorite', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ recipeId: recipe.id})
            });
            if (!resp.ok) {
                throw new Error("Failed to add recipe to favorites");
            }
        } catch (error) {
            console.error("Error adding recipe to favorites:", error);
        }
    };
    

    return (
        <li className="card" data-testid="recipe-item">
            <div style={{ backgroundColor: 'bisque', padding: '20px' }}>
                <h4>{recipe.title}</h4>
                <p><b>Total Time to Make in Minutes: </b>{recipe.time_to_make}</p>
                <p><b>Ingredients: </b>{recipe.ingredients}</p>
                <p><b>Instructions: </b>{recipe.instructions}</p>
                <p><b>Categories: </b>{recipe.categories.map(category => category.name).join(', ')}</p>
                <br/>
                <br/>
                {isFavorite ? (
                    <button className="primary favorite-btn" onClick={handleClick}>❤️</button>
                ) : (
                    <button className="unfavorite-btn" onClick={handleClick}>🩶</button>
                )}
                <div className="button-container">
                    <button className="update-btn" onClick={() => handleUpdate(recipe)}>Update Recipe</button>
                    <button className="delete-btn" onClick={() => handleDelete(recipe.id)}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default RecipeCard;