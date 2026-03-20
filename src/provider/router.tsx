import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../pages/layout/layout";
import { CONSTANTS } from "../constants";
import Home from "../pages/home";
import SearchPage from "../pages/search";
import WatchPage from "../pages/watch";
import WatchTvShowPage from "../pages/watch/tv-show";
import MoviesPage from "../pages/movies";
import SeriesPage from "../pages/series";
import UpcomingPage from "../pages/upcoming";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: CONSTANTS.ROUTERS.home,
                element: <Home />,
            },
            {
                path: CONSTANTS.ROUTERS.search,
                element: <SearchPage />,
            },
            {
                path: CONSTANTS.ROUTERS.movies,
                element: <MoviesPage />,
            },
            {
                path: CONSTANTS.ROUTERS.series,
                element: <SeriesPage />,
            },
            {
                path: CONSTANTS.ROUTERS.watch,
                element: <WatchPage />,
            },
            {
                path: CONSTANTS.ROUTERS.watchTvShow,
                element: <WatchTvShowPage />,
            },
            {
                path: CONSTANTS.ROUTERS.upcoming,
                element: <UpcomingPage />,
            }
        ]
    }
])