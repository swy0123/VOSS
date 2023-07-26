import { createBrowserRouter, Routes, Route} from "react-router-dom";
import Root from "./Root";
import ErrorComponent from "./components/ErrorComponent";
import NotFound from "./pages/NotFound"
import Home from "./pages/Home";
import SelectCategory from "./pages/SelectCategory";
import TrainingVoiceAnalysis from "./pages/TrainingVoiceAnalysis";
import TrainingDubbing from "./pages/TrainingDubbing";
import TrainingAccent from "./pages/TrainingAccent";
import FreeBoard from "./pages/FreeBoard";
import PostDetail from "./components/FreeBoard/PostDetail";
import PostCreate from "./components/FreeBoard/PostCreate";
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
            {
                path:"freeboard",
                element: <FreeBoard/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"freeboard/:id",
                element: <PostDetail/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path:"freeboard/create",
                element: <PostCreate/>,
                errorElement: <ErrorComponent/>,
            },
                       {
                path:"freeboard/:id",
                element: <PostDetail/>,
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