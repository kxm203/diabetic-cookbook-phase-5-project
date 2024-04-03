import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Auth from "./Auth";

function App() {
  const [ darkMode, setDarkMode ] = useState(false)
  const [ loggedInUser, setLoggedInUser ] = useState(null)

  function onDarkModeToggle() {
    setDarkMode(!darkMode)
  }
  const className = darkMode ? 'App bg-dark' : 'App light'

  return (
    <div className = { className }>
      <Header darkMode = { darkMode } onDarkModeToggle = { onDarkModeToggle} />
    {
      !!loggedInUser ?
      <Outlet />:
      <Auth setUser = { setLoggedInUser } />
    }
  </div>
  );
}

export default App;
