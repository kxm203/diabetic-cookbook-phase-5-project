import React, { useState, useEffect } from "react";
import Header from './Header';

function NewRecipeForm() {
    const [title, setTitle] = useState("");
    const [timeToMake, setTimeToMake] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState("");
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        fetch("/categories")
        .then((resp) => resp.json())
        .then((data) => setAllCategories(data))
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const recipeData = { 
            title, 
            time_to_make: timeToMake, 
            ingredients, 
            instructions, 
            categories,
        };

        const addRecipe = (newRecipe) => {
            fetch("/recipes", {
                method: "POST",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify(newRecipe),
            })
            .then((resp) => resp.json())
            .then((data) => {
                setRecipes([...recipes, data]);
            })
        };
            addRecipe(recipeData);
            setTitle("");
            setTimeToMake("");
            setIngredients("");
            setInstructions("");
            setCategories([]);
    };

    const handleCategoryChange = (event) => {
        setCategories(prevCategories => {
            const selectedCategory = event.target.value;
            if (prevCategories.includes(selectedCategory)) {
                return prevCategories.filter(category => category !== selectedCategory);
            } else {
                return [...prevCategories, selectedCategory];
            }
        });
    };

    return (
        <div>
            <Header />
                <section className="new-recipe-form" >
                <h1>Add A Recipe!</h1>
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
                    <label htmlFor="timeToMake">Time to make (minutes): </label><input
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
                    <button type="submit">Submit</button>
                </form>
                </section>
        </div>
    );
};

export default NewRecipeForm;