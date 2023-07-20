import { createBrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Root from "./Root";
import ErrorComponent from "./components/ErrorComponent";
import NotFound from "./pages/NotFound"
import Home from "./pages/Home";
import SelectCategory from "./pages/SelectCategory";
import TrainingVoiceAnalysis from "./pages/TrainingVoiceAnalysis";
import TrainingDubbing from "./pages/TrainingDubbing";
import TrainingAccent from "./pages/TrainingAccent";

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
                path:"category",
                element: <SelectCategory/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"analysis",
                element: <TrainingVoiceAnalysis/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"dubbing",
                element: <TrainingDubbing/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"accent",
                element: <TrainingAccent/>,
                errorElement: <ErrorComponent/>,
            },
        ],
        errorElement: <NotFound/>
    }
])

export default router;