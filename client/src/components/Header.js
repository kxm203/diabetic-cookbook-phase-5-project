import { NavLink } from "react-router-dom";

function Header({ darkMode, onDarkModeToggle }) {
    const handleModeClick = () => onDarkModeToggle()
    const buttonText = darkMode ? "Light" : "Dark"

    return (
        <header className="header">
            <nav className="nav-links">
                <NavLink to="/recipes">Recipes</NavLink>
                <NavLink to="/recipes/new">New Recipe</NavLink>
                <NavLink to="/recipes/favorite">Favorites</NavLink>
            </nav>
            <div className="dark-mode-button-container">
                <button onClick={handleModeClick}>{buttonText}</button>
            </div>
            <h1>
                <a href="/">
                    <img src="https://julianhealthcare.com/wp-content/uploads/2019/07/Diabetes.jpg" alt="Diabetes" className="logo" />
                </a>
            </h1>
        </header>
    )
}

export default Header;