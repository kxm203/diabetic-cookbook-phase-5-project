import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"
import Auth from "./components/Auth";

function App() {
  const [ loggedInUser, setLoggedInUser ] = useState(null)

  // useEffect(() => {
  //   fetch('/authorized')
  //   .then(resp => {
  //     if (resp.ok) {
  //       resp.json().then((user) => setLoggedInUser(user)) 
  //     }
  //   })
  // }, [])

  return (
    <div className = "login-page">
      <h1>Diabetes Cookbook</h1>
      <img src="https://julianhealthcare.com/wp-content/uploads/2019/07/Diabetes.jpg" alt="Login Page Image" />

      <div className="login-container">
        {
          !!loggedInUser ?
          <Outlet /> :
          <Auth setUser={setLoggedInUser} />
        }
      </div>

      <section className="about">
        <h2>About This App</h2>
        <p>When I had emergency abdominal surgery done, I was already pre-diabetic, and that complicated the timing of my surgery.
          After I got home from the hospital, I was diagnosed with type-2 diabetes and with the change came a totally different eating habit
          as well as choices.  Trying to find low-carb meals was pretty tough, and my wife Steph did a lot of research to see what I could and 
          could not eat.  So I came up with this idea to share with people who are looking for recipes and alternatives so they can keep their 
          blood sugar in check.
        </p>
      </section>
   </div>
  );
}

export default App;
