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

export const apiGetOneUser = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// PATCH update user by ID
// export const apiUpdateUser = async (userId, data) => {
//   try {
//     const response = await apiClient.patch(`/users/${userId}`, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating user:', error);
//     throw error;
//   }
// };

export const apiUpdateUser = async (id, data) => {
  try {
    const response = await apiClient.patch(`/users/${id}`, data, {
      headers: {
        'Content-Type': 'application/json' // Changed from multipart/form-data to application/json
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const apiCountAllAssets = async () => {
    try {
        const response = await apiClient.get('/assets/count');
        return response.data;
    } catch (error) {
        console.error('Error counting assets:', error);
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

export const apiGetSimilarAssets = async (assetId) => {
  try {
    const response = await apiClient.get(`/${assetId}/similar`);
    return response.data;
  } catch (error) {
    console.error('Error fetching similar assets:', error);
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

export const apiGetNewLocations = async (assetId) => {
    try {
        const response = await apiClient.get(`/assets/${assetId}/update-location`);
        return response.data;
    } catch (error) {
        console.error('Error fetching new locations:', error);
        throw error;
    }
};

export const apiGetLocationAssignments = async () => {
    try {
        const response = await apiClient.get('/assets/location-assignments');
        return response.data;
    } catch (error) {
        console.error('Error fetching location assignments:', error);
        throw error;
    }
};

export const apiGetLocationStats = async () => {
    try {
        const response = await apiClient.get('/assets/location-stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching location stats:', error);
        throw error;
    }
};

export const apiFilterAssetsByLocations = async (locationId) => {
    try {
        const response = await apiClient.get(`/assets?assetLocation=${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching assets by location:', error);
        throw error;
    }
};

export const apiAddLocation = async (locationData) => {
  try {
    const response = await apiClient.post('/locations', locationData);
    return response.data;
  } catch (error) {
    console.error('Error adding location:', error);
    throw error;
  }
};

export const apiEditLocation = async (id, updateData) => {
  try {
    const response = await apiClient.patch(`/locations/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
};

export const apiGetOneLocation = async (id) => {
  try {
    const response = await apiClient.get(`/locations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Location retrieval failed:", error);
    throw error;
  }
};

// Updated API function in servicess/tali.js
export const apiUpdateAssetLocation = async (assetId, updateData) => {
    try {
        // Match the exact API specification - only send newLocation
        const payload = {
            newLocation: updateData.newLocation || updateData.newLocationId || updateData.locationId
        };

        console.log('Sending payload:', payload); // Debug log
        console.log('Asset ID:', assetId); // Debug log

        const response = await apiClient.patch(`/assets/${assetId}/update-location`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating asset location:', error);
        
        // Log more details about the error
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        }
        
        throw error;
    }
};

// Alternative function if you need to handle justification separately
export const apiUpdateAssetLocationComplete = async (assetId, updateData) => {
    try {
        // Step 1: Update location
        const locationPayload = {
            newLocation: updateData.newLocation
        };

        const locationResponse = await apiClient.patch(`/assets/${assetId}/update-location`, locationPayload);
        
        // Step 2: If justification is needed, you might need a separate endpoint
        // or update the asset with justification using the regular edit endpoint
        if (updateData.justification) {
            try {
                const justificationPayload = {
                    justification: updateData.justification
                };
                await apiClient.patch(`/assets/${assetId}`, justificationPayload);
            } catch (justError) {
                console.warn('Could not update justification:', justError);
                // Don't throw here as the main location update succeeded
            }
        }

        return locationResponse.data;
    } catch (error) {
        console.error('Error updating asset location:', error);
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

export const apiImportAssetSheet = (formData) =>                          
  apiClient.post('/import-assets', formData, {
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

export const apiEditAsset = async (id, updateData) => {
  try {
    const response = await apiClient.patch(`/assets/${id}`, updateData, {
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

const fetchDataForPeriod = async (period, chartType) => {
  try {
    const response = await fetch(`/api/${chartType}?period=${period}`);
    const data = await response.json();
    // Update your state with the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateAssetLocation = async (assetId, newLocationId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://backend-ps-tali.onrender.com/assets/${assetId}/update-location`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newLocation: newLocationId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
};


export const apiGetNotifications = async () => {
  try {
    const response = await axios.get(
      "https://backend-ps-tali.onrender.com/notifications/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data || []; // return the data part only
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return []; // return empty list if error
  }
};

// Add these functions to your servicess/tali.js file

// API function to approve an asset
export const apiApproveAsset = async (assetId) => {
  try {
    const response = await apiClient.patch(`/${assetId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving asset:', error);
    throw error;
  }
};

// API function to reject an asset
export const apiRejectAsset = async (assetId) => {
  try {
    const response = await apiClient.patch(`/${assetId}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting asset:', error);
    throw error;
  }
};

// API function to get unapproved assets
export const apiGetUnapprovedAssets = async () => {
  try {
    const response = await apiClient.get('/assets/unapproved');
    return response.data;
  } catch (error) {
    console.error('Error fetching unapproved assets:', error);
    throw error;
  }
};

// API function to get location stats
// export const apiGetLocationStats = async () => {
//   try {
//     const response = await apiClient.get('/assets/location-stats');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching location stats:', error);
//     throw error;
//   }
// };