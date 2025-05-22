import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'

function App() {
const router = createBrowserRouter([
  {
    path:"/",
    element: <LoginPage />
  },
  {
    path:"/search",
    element: <SearchPage />
  },
])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
