import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainRecipePage from "./components/MainRecipePage";
import NewRecipeForm from "./components/NewRecipeForm";
import FavoritesPage from "./components/FavoritesPage";
import ErrorPage from "./components/ErrorPage";
import UpdateRecipeForm from "./components/UpdateRecipeForm";

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
        element: <FavoritesPage />,
    },
    {
        path: '/recipes/:recipeId',
        element: <UpdateRecipeForm/>,
    },
    {
        path: "*",
        element: <ErrorPage />,
    }
]

export const router = createBrowserRouter(routes)