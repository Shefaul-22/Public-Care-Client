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
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../Pages/DashboardRelated/DashboardHome/DashboardHome";
import MyReports from "../Pages/DashboardRelated/MyReports/MyReports";
import PaymentHistory from "../Pages/DashboardRelated/PaymentHistory/PaymentHistory";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";


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
            },

            {
                path: "profile",
                element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>
            },
            {
                path: "updateProfile",
                element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
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

    },

    // Dashboard related

    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [

            {
                index: true,
                Component: DashboardHome

            },
            {
                path: "my-issues",
                Component: MyReports
            },

            {
                path: "payment-history",
                Component: PaymentHistory
            }
        ]
    }
])