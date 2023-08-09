import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorComponent from "./components/ErrorComponent";
import NotFound from "./pages/NotFound"
import Home from "./pages/Home";
import SelectCategory from "./pages/SelectCategory/SelectCategory";
import VoiceAnalysis from "./pages/VoiceAnalysis/VoiceAnalysis";
import DubbingList from "./pages/DubbingList/DubbingList";
import DubbingRoom from "./pages/DubbingRoom/DubbingRoom";
import Accent from "./pages/Accent/Accent";
import FreeBoard from "./pages/FreeBoard/FreeBoard";
import PostDetail from "./components/FreeBoard/PostDetail/PostDetail";
import PostCreate from "./components/FreeBoard/PostCreate/PostCreate";
import PostUpdate from "./components/FreeBoard/PostUpdate/PostUpdate";
import MeetingBoard from "./pages/MeetingBoard";
import Meeting from "./pages/Meeting/Meeting";
import Profile from "./pages/Profile/Profile";
import Avatar from "./pages/Avatar/Avatar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "category",
                element: <SelectCategory />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "analysis",
                element: <VoiceAnalysis />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "dubbinglist",
                element: <DubbingList />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "dubbingroom/:id",
                element: <DubbingRoom />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "accent",
                element: <Accent />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "freeboard",
                element: <FreeBoard />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "freeboard/:id",
                element: <PostDetail />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "freeboard/create",
                element: <PostCreate />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "freeboard/update/:id",
                element: <PostUpdate />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "meeting",
                element: <MeetingBoard />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "meeting/join",
                element: <Meeting />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "profile/:id",
                element: <Profile />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "avatar",
                element: <Avatar />,
                errorElement: <ErrorComponent />,
            },
        ],
        errorElement: <NotFound />
    }
])

export default router;