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
import ErrorPage from "./pages/ErrorPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUserRole } from "./servicess/auth";

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
    element: <AdvancedSearchModal />,
  },
  {
    path: "/assetchart",
    element: <AssetManagementTable />,
  },
  {
    path: "/side-bar",
    element: <Sidebar1 />,
  },
  // Error page route
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AssetOverview />,
          </ProtectedRoute>
        ),
      },
      {
        path: "assets",
        element: (
        <ProtectedRoute>
        <AllAssets />,
        </ProtectedRoute>
        )
      },
      {
        path: "assets/add-asset",
        element: (
        <ProtectedRoute>
        <AddAsset />,
        </ProtectedRoute>
        )
      },
      {
        path: "assets/view-asset/:id",
        element: (
        <ProtectedRoute>
        <ViewAsset />,
        </ProtectedRoute>
        )
      },
      {
        path: "assets/import-assets",
        element: (
        <ProtectedRoute>
        <ImportAssetsPage />,
        </ProtectedRoute>
        )
      },
      {
        path: "assign-location/:id",
        element: (
        <ProtectedRoute>
        <AssignLocationPage />,
        </ProtectedRoute>
        )
      },
      {
        path: "users",
        element: (
          <ProtectedRoute allowedRoles={["administrator"]} userRole={getUserRole()}>
            <AllUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:userId",
        element: (
        <ProtectedRoute>
        <UserAccount />,
        </ProtectedRoute>
        )
      },
      {
        path: "reports",
        element: (
        <ProtectedRoute>
        <Report />,
        </ProtectedRoute>
        )
      },
      {
        path: "approvals",
        element: (
        <ProtectedRoute>
        <AssetApprovals />,
        </ProtectedRoute>
        )
      },
      {
        path: "users/add-user",
        element: (
        <ProtectedRoute>
        <AddUser />,
        </ProtectedRoute>
        )
      },
      {
        path: "assigned",
        element: (
        <ProtectedRoute>
        <AssignedPage />,
        </ProtectedRoute>
        )
      },
      { path: "manage-location", element:(
        <ProtectedRoute>
        <ManageStore />,
        </ProtectedRoute>
        ) 
      },
      {
        path: "settings",
        element: (
        <ProtectedRoute>
        <Settings />,
        </ProtectedRoute>
        )
      },
    ],
  },
  // Catch-all route for 404 errors
  {
    path: "*",
    element: <ErrorPage />,
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
