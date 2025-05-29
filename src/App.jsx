
// src/App.jsx
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import AddUser from './components/AddUser'
import AssetOverview from './pages/AssetOverview'
import SearchResult from './pages/SearchResult'
import DashboardLayout from './Layouts/DashboardLayout'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/dashboard'

// Toastify import
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Define all your routes here
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/search-result',
    element: <SearchResult />,
  },
  {
    path: '/add-user',
    element: <AddUser />,
  },
  {
    path: '/overview',
    element: <AssetOverview />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AssetOverview />,
      }
    ]
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
  },
  {
    path: "/dash",
    element: <Dashboard />,
  },
])

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
  )
}

export default App
