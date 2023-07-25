import { createBrowserRouter, Routes, Route} from "react-router-dom";
import Root from "./Root";
import ErrorComponent from "./components/ErrorComponent";
import NotFound from "./pages/NotFound"
import Home from "./pages/Home";
import SelectCategory from "./pages/SelectCategory";
import VoiceAnalysis from "./pages/VoiceAnalysis";
import Dubbing from "./pages/Dubbing";
import Accent from "./pages/Accent";
import FreeBoard from "./pages/FreeBoard";
import MeetingBoard from "./pages/MeetingBoard";

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
                element: <VoiceAnalysis/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"dubbing",
                element: <Dubbing/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"accent",
                element: <Accent/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"freeboard",
                element: <FreeBoard/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"meeting",
                element: <MeetingBoard/>,
                errorElement: <ErrorComponent/>,
            },
        ],
        errorElement: <NotFound/>
    }
])

export default router;