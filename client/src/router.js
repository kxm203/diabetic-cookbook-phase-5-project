import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./components/About";
import MainRecipePage from "./components/MainRecipePage";
import RecipeList from "./components/RecipeList";
import NewRecipeForm from "./components/NewRecipeForm";
import Favorite from "./components/Favorite";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/recipes',
                element: <MainRecipePage />,
                children: [
                    {index: true, element: <RecipeList /> },
                    {
                        path: "new",
                        element: <NewRecipeForm />
                    },
                    {
                        path: "favorite",
                        element: <Favorite />
                    }
                ]
            },
        ]
    },
]

export const router = createBrowserRouter(routes)