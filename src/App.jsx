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
import ManageStore from "./pages/ManageLocation";
import UserAccount from "./pages/UserAccount";
import AllAssets from "./pages/AllAssets";
import AllUsers from "./pages/AllUsers";
import ViewAsset from "./pages/ViewAsset";
import AssignedPage from "./pages/AssignedPage";
import Settings from "./pages/Settings";
import Report from "./pages/Report";
import AssignLocationPage from "./pages/AssignLocationPage";
import ImportAssetsPage from "./pages/ImportAssetsPage";
import AssetManagementTable from "./pages/AssetManagementGraph";
import AdvancedSearchModal from "./pages/AdvancedSearchModal";
import AssetApprovals from "./pages/AssetApprovals";

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


  {
    path: "/add-asset",
    element: <AddAsset />,
  },
  {
    path: "/advanced",
    element: <AdvancedSearchModal />
  },
  {
    path:"/assetchart",
    element: <AssetManagementTable />
  },

  {
    path: "/side-bar",
    element: <Sidebar1 />,
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
        path: "assets/import-assets",
        element: <ImportAssetsPage />,
      },
      {
        path: "assign-location/:id",
        element: <AssignLocationPage />,
      },

      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "users/:userId",
        element: <UserAccount />,
      },
      {
        path: "reports",
        element: <Report />,
      },
      {
        path: "approvals",
        element: <AssetApprovals />,
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
      {
        path: "settings",
        element: <Settings />,
      },
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
