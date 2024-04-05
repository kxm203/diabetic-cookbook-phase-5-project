import React, { useState } from "react";

function NewRecipeForm({ addRecipe }) {
    const [title, setTitle] = useState("");
    const [timeToMake, setTimeToMake] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [categories, setCategories] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        addRecipe({ title, timeToMake, ingredients, instructions, categories });
        setTitle("");
        setTimeToMake("");
        setIngredients("");
        setInstructions("");
        setCategories("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <label htmlFor="timeToMake">Time to make: </label>
            <input
                type="number"
                id="timeToMake"
                value={timeToMake}
                onChange={(event) => setTimeToMake(event.target.value)}
            />
            <label htmlFor="ingredients">Ingredients: </label>
            <input
                type="text"
                id="ingredients"
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)}
            />
            <label htmlFor="instructions">Instructions: </label>
            <input
                type="text"
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
            />
            <label htmlFor="categories">Categories: </label>
            <input
                type="text"
                id="categories"
                value={categories}
                onChange={(event) => setCategories(event.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default NewRecipeForm;