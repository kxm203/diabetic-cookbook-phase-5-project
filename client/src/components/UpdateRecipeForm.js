import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

function UpdateRecipeForm() {
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const [recipeData, setRecipeData] = useState(null);
    const [title, setTitle] = useState("");
    const [timeToMake, setTimeToMake] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        if (!recipeData) {
            fetch(`/recipes/${recipeId}`)
            .then((resp) => resp.json())
            .then((data) => {
                setRecipeData(data);
                setTitle(data.title);
                setTimeToMake(data.time_to_make);
                setIngredients(data.ingredients);
                setInstructions(data.instructions);
                setCategories(data.categories.map((category) => category.id));
            })
            .catch((error) => console.error("Error fetching recipe:", error));
        }
    }, [recipeData]);
    
    useEffect(() => {
        fetch("/categories")
        .then((resp) => resp.json())
        .then((data) => setAllCategories(data))
        .catch((error) => console.error("Error fetching categories:", error));
    }, [recipeId]);


    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedRecipeData = { 
            title, 
            time_to_make: timeToMake, 
            ingredients, 
            instructions, 
            //categories,
        };

        handleUpdate(recipeId, updatedRecipeData);
    };

    const handleCategoryChange = (event) => {
        setCategories(event.target.value);
    };

    const handleUpdate = (recipeId, recipeData) => {
        fetch(`/recipes/${recipeId}`, {
            method: "PATCH",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(recipeData),
        })
            .then((resp) => resp.json())
            .then(() => {
                navigate('/recipes');
                
            });
    };
    
    

    return (
        <div>
            <Header />
                <section className="update-recipe-form" >
                <h1>Update Your Recipe!</h1>
                <br />
                <br />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <label htmlFor="timeToMake">Total Time to make (minutes): </label><input
                        type="number"
                        id="timeToMake"
                        value={timeToMake}
                        onChange={(event) => setTimeToMake(event.target.value)}
                    />
                    <label htmlFor="ingredients">Ingredients: </label>
                    <textarea
                        type="text"
                        id="ingredients"
                        value={ingredients}
                        onChange={(event) => setIngredients(event.target.value)}
                    />
                    <label htmlFor="instructions">Instructions: </label>
                    <textarea
                        type="text"
                        id="instructions"
                        value={instructions}
                        onChange={(event) => setInstructions(event.target.value)}
                    />
                    <div className="category-select">
                        <label htmlFor="categories">Categories: </label>
                        <select
                            id="categories"
                            multiple
                            value={categories}
                            onChange={handleCategoryChange}
                        >
                            {allCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Update</button>
                </form>
                </section>
        </div>
    );
};

export default UpdateRecipeForm;