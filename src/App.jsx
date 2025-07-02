// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Toastify import
import { ToastContainer } from "react-toastify";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import AssetOverview from "./pages/AssetOverview";
import SearchResult from "./pages/SearchResult";
import DashboardLayout from "./Layouts/DashboardLayout";
import "react-toastify/dist/ReactToastify.css";
import Sidebar1 from "./components/Sidebar1";
import AddUser from "./pages/AddUser";
import AddAsset from "./pages/AddAsset";
import ManageStore from "./pages/ManageStore";
import UserAccount from "./pages/UserAccount";
import AllAssets from "./pages/AllAssets";
import AllUsers from "./pages/AllUsers";
import ViewAsset from "./pages/ViewAsset";
import AssignedPage from "./pages/AssignedPage";

// Define all your routes here
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "view-asset/:id",
    element: <ViewAsset />,
  },
  {
    path: "/search-result",
    element: <SearchResult />,
  },

  // {
  //   path: "/add-user",
  //   element: <AddUser />,
  // },

  {
    path: "/add-asset",
    element: <AddAsset />,
  },

  {
    path: "/side-bar",
    element: <Sidebar1 />,
  },
  {
    path: "/user/:userId",
    element: <UserAccount />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AssetOverview />,
      },
      {
        path: "assets",
        element: <AllAssets />,
      },
      {
        path: "assets/add-asset",
        element: <AddAsset />,
      },
      {
        path: "assets/view-asset/:id",
        element: <ViewAsset />,
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "users/add-user",
        element: <AddUser />,
      },
      {
        path: "assigned",
        element: <AssignedPage />,
      },
      { path: "manage-location", element: <ManageStore /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;