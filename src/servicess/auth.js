import { apiClient } from "./config"

export const apiSignin = async(payload) => {
    return await apiClient.post('/users/login', payload);
};
;


export const apiProfile = async() => {
    return await apiClient.get('user/me');
};

export const apiAddUser = async(payload) => {
    return await apiClient.post("/users/register", payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};
console.log("Auth service loaded");