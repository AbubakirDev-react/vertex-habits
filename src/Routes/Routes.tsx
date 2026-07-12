import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import App from "../App";
import Add from "../Pages/Add";
import PageNotFound from "../Pages/404";

export const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children: [
      {path:"", element: <Dashboard />},
      {path: "*", element:<PageNotFound />}
    ]
  },
  {
    path: 'add-habit',
    element: <Add />
  }
])