import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import MyJobs from "../pages/my-jobs/MyJobs";
import AllJobs from "../components/AllJobs";
import Apply from "../pages/apply/Apply";
import ViewCv from "../pages/CV-View/ViewCv";
import Support from "../pages/support/Support";
import NotFoundPage from "../components/shared/Error";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/",
            element: <AllJobs />,
          },
          {
            path: "my-jobs",
            element: <MyJobs />,
          },
          {
            path: "view-cv",
            element: <ViewCv />,
          },
          {
            path: "support",
            element: <Support />,
          },
          {
            path: "apply/:_id",
            element: <Apply />,
          },
        ],
      },
      { path: "/login", element: <Login /> },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default Router;
