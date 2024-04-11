import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import Header from "./Header"

function FavoritesPage() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    // Fetch favorite recipes from the server when the component mounts
    useEffect(() => {
        fetchFavoriteRecipes();
    }, []);

    const fetchFavoriteRecipes = async () => {
        try {
            const response = await fetch("/favorites");
            if (!response.ok) {
                throw new Error("Failed to fetch favorite recipes");
            }
            const data = await response.json();
            setFavoriteRecipes(data);
        } catch (error) {
            console.error("Error fetching favorite recipes:", error);
        }
    };

    // const toggleFavorite = (recipeId, isFavorite) => {
    //     // Update the favorite status of the recipe on the backend
    //     // Update the favoriteRecipes state accordingly
    // };

    return (
        <div className="favorites">
            <Header />
            <h1>Favorites</h1>
            <ul>
                {favoriteRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </ul>
        </div>
    );
}

export default FavoritesPage;