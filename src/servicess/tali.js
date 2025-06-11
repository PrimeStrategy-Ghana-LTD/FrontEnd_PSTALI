import { apiClient } from "./config";


// export const apiAddAsset = async (payload) => apiClient.post("/assets", payload);

// export const apiGetLocations = async () => {
//     return await apiClient.get('/locations');
// }                                                                        

// export const apiGetAllAssets = async () => await apiClient.get('/assets');
// Henrrike


// Updated function to handle pagination parameters
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

// export const apiAddAsset = async (payload) => {
//     try {
//         const response = await apiClient.post("/assets", payload);
//         return response.data;                                        
//     } catch (error) {
//         console.error('Error adding asset:', error);
//         throw error;
//     }
// };

export const apiAddAsset = (formData) =>                          
  apiClient.post('/assets', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
export const apiAssignAsset = async (formData) => {
  try {
    const response = await fetch("https://backend-ps-tali.onrender.com/assignments", {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error("Assignment failed. Server responded with an error.");
    }

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
      console.error("Unexpected response type. Raw text:", text);
      throw new Error("Unexpected server response. Not JSON.");
    }
  } catch (error) {
    console.error("apiAssignAsset error:", error.message);
    throw error;
  }
};




// export const apiGetAllAssets = async () => {
//     try {
//         const response = await apiClient.get('/assets');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching assets:', error);
//         throw error;
//     }
// };