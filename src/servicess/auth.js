import { apiClient } from "./config"

export const apiSignin = async(payload) => {
    return await apiClient.post('/users/login', payload);
};
;


export const apiGetProfile = async (payload) => {
    return await apiClient.get ( '/users/me')
}

export const apiUpdateProfile = async (updateData) => {
    try {
        const response = await apiClient.patch('/users/me', updateData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiAddUser = async(payload) => {
    return await apiClient.post("/users/register", payload, {
        headers: {
            "Content-Type": "application/json"
        }
    });
};


export const apiChangePassword = async (updateData) => {
  try {
    const response = await apiClient.patch("/change-password", updateData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add authorization header
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

// Add this to the bottom of your existing auth service file

// ========== UTILITY FUNCTIONS ==========

// Get user role from JWT token
export const getUserRole = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // Decode JWT token to get user role
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || payload.userRole || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

// Check if user is authenticated and token is valid
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Check if user has required permissions
export const hasPermission = (userRole, requiredRoles) => {
  if (!userRole || !requiredRoles) return false;
  return requiredRoles.includes(userRole);
};

// User roles constants
export const USER_ROLES = {
  ADMIN: 'administrator',
  MANAGER: 'assetManager',
  VIEWER: 'viewer'
};