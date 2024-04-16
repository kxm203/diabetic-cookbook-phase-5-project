import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import Search from "./Search";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function MainRecipePage() {
    const navigate = useNavigate();
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

    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    const handleDelete = (recipeId) => {
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
    const handleUpdate = (recipeId) => {
        navigate(`/recipes/${recipeId}`);
    };
   

    

    return (
        <main className="main-container" >
            <Header />
            <Search onChange={ handleSearch } recipes={recipes}/>
            <RecipeList recipes={filteredRecipes} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
            <Footer />
        </main>
    );
}

export default MainRecipePage;