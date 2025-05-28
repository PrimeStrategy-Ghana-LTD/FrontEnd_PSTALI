
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
  element: <DashboardLayout/>



}
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
