import { apiClient } from "./config";


// export const apiAddAsset = async (payload) => apiClient.post("/assets", payload);

// export const apiGetLocations = async () => {
//     return await apiClient.get('/locations');
// }                                                                        

export const apiGetAllAssets = async () => await apiClient.get('/assets');
// Henrrike


export const apiGetLocations = async () => {
    try {
        const response = await apiClient.get('/locations');
        return response.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
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
  



// export const apiGetAllAssets = async () => {
//     try {
//         const response = await apiClient.get('/assets');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching assets:', error);
//         throw error;
//     }
// };