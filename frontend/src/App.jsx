import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Application from "./pages/Application";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { loader as appLoader } from "./features/Expenses";
import PageError from "./ui/PageError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Application />,
    loader: appLoader,
    errorElement: <PageError />,
  },
  {
    path: "/signup",
    element: <Registration />,
    errorElement: <PageError />,
  },
  {
    path: "/signin",
    element: <Login />,
    errorElement: <PageError />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
