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


import ProfilePage from "../Pages/ProfilePage/ProfilePage";


import AddStaff from "../Pages/DashboardRelated/AdminDashboard/AddStaff";
import ManageStaffs from "../Pages/DashboardRelated/AdminDashboard/ManageStaffs";
import AdminAllIssues from "../Pages/DashboardRelated/AdminDashboard/AdminAllIssues/AdminAllIssues";
import AssignedIssues from "../Pages/DashboardRelated/StaffDashboard/AssignedIssues/AssignedIssues";
import MyIssues from "../Pages/DashboardRelated/CitizenDashboard/MyIssues/MyIssues";
import IssueDetails from "../Pages/IssueDetails/IssueDetails";
import ManageUsers from "../Pages/DashboardRelated/AdminDashboard/ManageUsers";
import AllPaymentsHistory from "../Pages/DashboardRelated/AdminDashboard/AllPaymentsHistory";
import ServiceCenters from "../Pages/ServiceCenters/ServiceCenters";


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
                path: "service-centers",
                Component: ServiceCenters,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())

            },

            {
                path: "post-issue",
                element: <PrivateRoute><ReportIssue></ReportIssue></PrivateRoute>,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            },

            // {
            //     path: "profile",
            //     element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>
            // },



            {
                path: "issues/:id",
                element: <IssueDetails></IssueDetails>
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
                element: <PrivateRoute><MyIssues></MyIssues></PrivateRoute>
            },

            {

                path: "profile",
                element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>

            },

            // {
            //     path: "payment-history",
            //     Component: PaymentHistory
            // },

            // admin related route
            {
                path: "addStaff",
                element: <PrivateRoute><AddStaff></AddStaff></PrivateRoute>
            },

            {
                path: "admin-all-issues",
                element: <PrivateRoute><AdminAllIssues></AdminAllIssues></PrivateRoute>
            },

            {
                path: "manage-users",
                element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
            },

            {
                path: "allPayments-history",
                element: <PrivateRoute><AllPaymentsHistory></AllPaymentsHistory></PrivateRoute>
            },

            // Staff related routes

            {
                path: "staff-assigned-issues",
                element: <PrivateRoute><AssignedIssues></AssignedIssues></PrivateRoute>
            },





            

            
        ]
    }
])