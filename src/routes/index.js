import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";
import GenrePage from "../pages/GenrePage";
import RecommendPage from "../pages/Recommendations";
import Example from "../pages/pricing";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : ":explore",
                element : <ExplorePage/>
            },
            {
                path : ":explore/:id",
                element : <DetailsPage/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                path : "genre",
                element : <GenrePage/>
            },
            {
                path : "recommendations",
                element : <RecommendPage/>   
            },
            {
                path : "pricing",
                element : <Example />
            }
        ]
    }
])

export default router