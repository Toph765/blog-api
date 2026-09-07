import App from "./App";
import { Homepage } from "./components/Homepage";
import { Blogpost } from "./components/BlogPost";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import {NewBlog} from "./components/NewBlog";

export const routes = [{
    path: "/",
    element: <App />,
    children: [
        {index: true, element:  <Homepage />},
        {path: "/homepage", element: <Homepage />},
        {path: "/blogpost/:id", element: <Blogpost />},
        {path: "/log-in", element: <LogIn />},
        {path: "/sign-up", element: <SignUp />},
        {path: "/new-blog", element: <NewBlog />},
    ]
    
}]