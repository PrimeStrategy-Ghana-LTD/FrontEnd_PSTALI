import { apiClient } from "./config";

export const apiGetAllUsers = async () => {
    try {
        const response = await apiClient.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const apiGetAllAssets = async (params = {}) => {
    try {
        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `/assets?${queryString}` : '/assets';
        
        const response = await apiClient.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching assets:', error);
        throw error;
    }
};


export const apiGetLocations = async () => {
    try {
        const response = await apiClient.get('/locations');
        return response.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};
export const apiGetUsers = async () => {
    try {
        const response = await apiClient.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};


export const apiAddAsset = (formData) =>                          
  apiClient.post('/assets', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  


// In your API service file (servicess/tali.js)
export const apiAssignAsset = async (assignmentData) => {
  try {
    // Get the token from localStorage, sessionStorage, or your auth context
    const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const response = await fetch('https://backend-ps-tali.onrender.com/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(assignmentData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Assignment failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Assignment Error:', error);
    throw error;
  }
};

export const apiGetOneAsset = async (id) => {
  try {
    const response = await apiClient.get(`/assets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Asset retrieval failed:", error);
    throw error;
  }
};