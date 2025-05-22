import { apiClient } from "./config";

export const apiAddUser = async (payload) => {
    return await apiClient.post("/users/register", payload);
};