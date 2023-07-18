import { createBrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Root from "./Root";
import ErrorComponent from "./components/ErrorComponent";
import NotFound from "./pages/NotFound"

const router = createBrowserRouter([
    {
        path:"/",
        element: <Root/>,
        children:[
            {
                path:"",
                element: <Home/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"about",
                element: <About/>,
                errorElement: <ErrorComponent/>,
            },
        ],
        errorElement: <NotFound/>
    }
])

export default router;