import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../Pages/Home/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import AllIssues from "../Pages/AllIssues/AllIssues";
import Services from "../Pages/Services/Services";
import AboutUs from "../Pages/AboutUs/AboutUs";
import PrivateRoute from "./PrivateRoute";
import ReportIssue from "../Pages/ReportIssue/ReportIssue";


export const router = createBrowserRouter([

    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: "allIssues",
                Component: AllIssues
            },
            {
                path: "services",
                Component: Services
            },
            {
                path: "aboutUs",
                Component: AboutUs
            },

            {
                path: "post-issue",
                element: <PrivateRoute><ReportIssue></ReportIssue></PrivateRoute>,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            }
        ]
    },

    // AuthLayout related
    {
        path: "/",
        Component: AuthLayout,
        children: [

            {
                path: "register",
                Component: Register
            },

            {
                path: "login",
                Component: Login
            }
        ]

    }
])