import { NavLink } from "react-router-dom";
import React from 'react';
import Logout from './Logout';

function Header() {


    return (
        <header>
            <h1 className="header-title">My Recipe App</h1>
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Logout />
            </div>
            <br/>
            <nav className="nav-links">
                <NavLink to="/recipes">Recipes</NavLink>
                <NavLink to="/recipes/new">New Recipe</NavLink>
                <NavLink to="/recipes/favorite">Favorites</NavLink>
                <br/>
                <br/>
                
            </nav>
        </header>
    )
}

export default Header;