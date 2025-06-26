// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import AssetOverview from "./pages/AssetOverview";
import SearchResult from "./pages/SearchResult";
import DashboardLayout from "./Layouts/DashboardLayout";
import Sidebar from "./components/Sidebar";


// Toastify import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar1 from "./components/Sidebar1";
import AllAssets from "./pages/AllAssets";
import ViewAsset from "./pages/ViewAsset";
import AddUser from "./pages/AddUser";
import AllUsers from "./pages/AllUsers";
import AssignedPage from "./pages/AssignedPage";
// import ManageStore from "./pages/ManageStore";
import AssetCardView from "./pages/AssetCardView";
import AddAsset from "./pages/AddAsset";
import ManageStore from "./pages/ManageStore";
import UserAccount from "./pages/UserAccount";


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
    path: "/search-result",
    element: <SearchResult />,
  },

  {
    path: "/assets",
    element: <AllAssets />,
  },
  {
    path: "/add-user",
    element: <AddUser />,
  },
  {
    path: "/users",
    element: <AllUsers />,
  },
  {
    path: "/add-asset",
    element: <AddAsset />
  },
  {
    path: "/assigned",
    element: <AssignedPage />,
  },
  {
    path: "/overview",
    element: <AssetOverview />,
  },
  {
    path: "/card-view",
    element: <AssetCardView />
  },
  {
    path: "/view-asset/:id",
    element: <ViewAsset />,
  },
  {
    path: "/side-bar",
    element: <Sidebar1 />,
  },
  {
    path: "/user-account",
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
      { path: "manage-location", element: <ManageStore /> },
    ],
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
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
