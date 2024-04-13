import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainRecipePage from "./components/MainRecipePage";
import NewRecipeForm from "./components/NewRecipeForm";
import Favorite from "./components/Favorite";
import ErrorPage from "./components/ErrorPage";

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
    {
        path: "*",
        element: <ErrorPage />,
    }
]

export const router = createBrowserRouter(routes)