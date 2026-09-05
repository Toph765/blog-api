import Homepage from "./components/Homepage";
import Blogpost from "./components/Blogposts";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import App from "./App";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {index: true, element: <Homepage />},
            {path: "/", element: <Homepage />},
            {path: "blogposts/:id", element: <Blogpost />},
            {path: "log-in", element: <LogIn />},
            {path:"sign-up", element: <SignUp />}
        ]
    },
    /* {
        path: "log-in",
        element: <LogIn />
    },
    {
        path: "sign-up",
        element: <SignUp />
    } */
]

export default routes;