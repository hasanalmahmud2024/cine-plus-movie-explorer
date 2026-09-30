import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import MovieListingPage from "./pages/MovieListingPage";
import AboutPage from "./pages/AboutPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: '/movies',
                element: <MovieListingPage />,
            },
            {
                path: '/about',
                element: <AboutPage />,
            },
        ]
    },
]);