import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import Menu from "./routes/Menu/Menu.route";
import Upload from "./routes/Upload/Upload.route";
import Admin from "./routes/Admin/Admin.route";

import Navbar from "./components/Navbar/Navbar.component";
import Product from "./components/Product/Product.component";

const App = () => {
    const Layout = () => {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        );
    };

    const ProtectedRoute = ({ children }) => {
        const currentUser = 1;
        if (!currentUser) {
            return <Navigate to="/" />;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Menu />,
                },
                {
                    path: "/menu/:id",
                    element: <Product />,
                },
                {
                    path: "/upload",
                    element: <Upload />,
                },
                {
                    path: "/admin",
                    element: <Admin />,
                },
            ],
        },
        // {
        //     path: "/login",
        //     element: <Login />,
        // },
        // {
        //     path: "/register",
        //     element: <Register />,
        // },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
