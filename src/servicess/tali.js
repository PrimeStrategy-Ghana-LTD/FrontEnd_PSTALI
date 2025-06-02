import { apiClient } from "./config";


export const apiAddAsset = async (payload) => apiClient.post("/assets", payload);

export const apiGetLocations = async () => {
    return await apiClient.get('/locations');
}

export const apiGetAllAssets = async () => await apiClient.get('/assets');