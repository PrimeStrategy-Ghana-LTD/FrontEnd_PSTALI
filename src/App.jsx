
// src/App.jsx
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import AddUser from './components/AddUser'

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
    path: '/add-user',
    element: <AddUser />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
