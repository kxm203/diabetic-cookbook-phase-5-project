import React from "react";

function Search({ onChange }) {
const handleInputChange = (event) => {
    const { value } = event.target;
    onChange(value);
    console.log("Searching...")
}

    return (
        <div className="searchbar">
            <label htmlFor="search">Search Recipes: </label>
            <input
                type="text"
                id="search"
                placeholder="Start with the first letter..."
                onChange={ handleInputChange}
            />
        </div>
    );
}

export default Search;