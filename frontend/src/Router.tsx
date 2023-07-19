import { createBrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
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
                path:"selectcategory",
                element: <SelectCategory/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"trainingvoiceanalysis",
                element: <TrainingVoiceAnalysis/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"trainingdubbing",
                element: <TrainingDubbing/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"trainingaccent",
                element: <TrainingAccent/>,
                errorElement: <ErrorComponent/>,
            },
        ],
        errorElement: <NotFound/>
    }
])

export default router;