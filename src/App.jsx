import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";
import { Layout } from "./layout/Layout";
import "./App.css";
import FoodCart from "./component/FoodCart";
import Cart from "./component/Cart";
import { ErrorPage } from "./page/ErrorPage";
import Navbar from "./layout/Navbar";
import MyAccount from "./page/MyAccount";
import { DynamicPage } from "./component/DynamicPage";
import { DynamicPageApi } from "./component/DynamicPageApi";
import AdminLogin from "./component/admin/AdminLogin";
import AdminDashboard from "./component/admin/AdminDashboard";
import PrivateRoute from "./component/admin/PrivateRoute";
import ManageUsers from "./component/admin/ManageUsers";
import Hero from "./component/Hero/Hero";
import Contact from "./component/contact/contact";
import PaymentSuccess from "./page/PaymentSuccess";
import PaymentCancel from "./page/PaymentCancel";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        // { path: "/", element: <FoodCart /> },
        {
          path: "/",
          element: (
            <>
              {" "}
              <Hero /> <FoodCart />{" "}
            </>
          ),
        },
        { path: "/products", element: <FoodCart /> },
        { path: "/contact", element: <Contact /> },
        // Dynamic Page
        {
          path: "/products/:productID",
          element: <DynamicPage />,
          loader: DynamicPageApi,
        },
      ],
    },
    {
      path: "/cart",
      element: (
        <>
          {" "}
          <Navbar /> <Cart />{" "}
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          {" "}
          <Navbar /> <MyAccount />{" "}
        </>
      ),
    },
    {
      path: "/success",
      element: <PaymentSuccess />,
    },
    {
      path: "/cancel",
      element: <PaymentCancel />,
    },

    // ADMIN KE ROUTE
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      ),
    },
    { path: "/dashboard/user/:id", element: <ManageUsers /> },
    {
      path: "/adminlogin",
      element: (
        <>
          {" "}
          <AdminLogin />{" "}
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
