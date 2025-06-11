// src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ allowedRoles, userRole }) => {
  if (!userRole) return <Navigate to="/" replace /> // Redirect to login if not authenticated
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/unauthorized" replace />
}

export default ProtectedRoute
