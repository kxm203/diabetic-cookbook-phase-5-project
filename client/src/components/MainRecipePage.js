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


    useEffect(() => {
        const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecipes(filtered);
    },  [searchQuery, recipes]);
    console.log(recipes)
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
            <Search onChange={ handleSearch } recipes={recipes}/>
            <RecipeList recipes={filteredRecipes} deleteRecipe={deleteRecipe} />
        </main>
    );
}

export default MainRecipePage;