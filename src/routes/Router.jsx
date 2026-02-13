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
import AdminRoute from "./AdminRoute";
import StaffRoute from "./StaffRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";


export const router = createBrowserRouter([

    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage,
                handle: {
                    title: "Home"
                }
            },
            {
                path: "allIssues",
                Component: AllIssues,
                handle: {
                    title: "All Issues"
                }
            },
            {
                path: "services",
                Component: Services,
                handle: {
                    title: "Services"
                }
            },
            {
                path: "aboutUs",
                Component: AboutUs,
                handle: {
                    title: "About Us"
                }
            },

            {
                path: "service-centers",
                Component: ServiceCenters,
                handle: {
                    title: "Service Centers"
                },
                loader: () => fetch('/serviceCenter.json').then(res => res.json())

            },

            {
                path: "post-issue",
                element: <PrivateRoute><ReportIssue></ReportIssue></PrivateRoute>,

                handle: {
                    title: "Report an Issue"
                },
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            },

            // {
            //     path: "profile",
            //     element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>
            // },



            {
                path: "issues/:id",
                element: <IssueDetails></IssueDetails>,
                handle: {
                    title: "Issue Details"
                }
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
                Component: Register,
                handle: {
                    title: "Register"
                }
            },

            {
                path: "login",
                Component: Login,

                handle: {
                    title: "Login"
                }
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
                Component: DashboardHome,
                handle: {
                    title: "Dashboard Home"
                }

            },
            {
                path: "my-issues",
                element: <PrivateRoute><MyIssues></MyIssues></PrivateRoute>,
                handle: {
                    title: "My Issues"
                }
            },

            {

                path: "profile",
                element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>,
                handle: {
                    title: "Your Profile"
                }

            },

            // {
            //     path: "payment-history",
            //     Component: PaymentHistory
            // },

            // admin related route
            {
                path: "addStaff",
                element: <PrivateRoute><AdminRoute><AddStaff></AddStaff></AdminRoute></PrivateRoute>,
                handle: {
                    title: "Add a Staff"
                }
            },

            {
                path: "admin-all-issues",
                element: <PrivateRoute><AdminRoute><AdminAllIssues></AdminAllIssues></AdminRoute></PrivateRoute>,
                handle: {
                    title: "Admin all Issues"
                }
            },

            {
                path: "manage-users",
                element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>,

                handle: {
                    title: "Manage Users"
                }
            },

            {
                path: "allPayments-history",
                element: <PrivateRoute><AllPaymentsHistory></AllPaymentsHistory></PrivateRoute>,
                handle: {
                    title: "Payment History"
                }
            },

            // Staff related routes

            {
                path: "staff-assigned-issues",
                element: <PrivateRoute><StaffRoute><AssignedIssues></AssignedIssues></StaffRoute></PrivateRoute>,

                handle: {
                    title: "Assigned Issues"
                }
            },



        ]
    },

    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
        handle: {
            title: "Error Page"
        }

    }
])