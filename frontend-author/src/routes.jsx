import App from "./App";
import { Homepage } from "./components/Homepage";

export const routes = [{
    path: "/",
    element: <App />,
    children: [
        {index: true, element:  <Homepage />},
        {path: "/homepage", element: <Homepage />}
    ]
    
}]