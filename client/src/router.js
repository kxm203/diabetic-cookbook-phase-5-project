import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainRecipePage from "./components/MainRecipePage";
import RecipeList from "./components/RecipeList";
import NewRecipeForm from "./components/NewRecipeForm";
import Favorite from "./components/Favorite";

const routes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/recipes',
        element: <MainRecipePage />,
    },
    {
        path: '/recipes/new',
        element: <NewRecipeForm />,
    },
    {
        path: '/recipes/favorite',
        element: <Favorite />,
    },
]

export const router = createBrowserRouter(routes)