import React, { useState, useEffect } from "react";
import NewRecipeForm from "./NewRecipeForm";
import RecipeList from "./RecipeList";
import Search from "./Search";
import Header from "./Header";

function MainRecipePage() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    

    useEffect(() => {
        fetch("/recipes")
        .then((resp) => resp.json())
        .then((data) => setRecipes(data))
    }, []);

    const addRecipe = (newRecipe) => {
        fetch("/recipes", {
            method: "POST",
            headers: {"Content-Type": "Application/JSON"},
            body: JSON.stringify(newRecipe),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setRecipes([...recipes, data]);
        })
    };
    useEffect(() => {
        const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecipes(filtered);
    },  [searchQuery, recipes]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    const deleteRecipe = (recipeId) => {
        fetch(`/recipes/${recipeId}`, {
            method:"DELETE",
        })
        .then((resp) => {
            if (resp.ok) {
                setFilteredRecipes((originalRecipes) =>
                originalRecipes.filter((recipe) => recipe.id !== recipeId)
                );
            } else {
                console.error("Failed to delete Recipe");
            }
        });
    };

    return (
        <main className="main-container">
            <Header />
            <Search onChange={ handleSearch }/>
            <RecipeList recipes={filteredRecipes} deleteRecipe={deleteRecipe} addRecipe={addRecipe} />
        </main>
    );
}

export default MainRecipePage;