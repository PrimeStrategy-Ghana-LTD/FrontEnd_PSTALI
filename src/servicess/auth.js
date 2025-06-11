import { apiClient } from "./config"

export const apiSignin = async(payload) => {
    return await apiClient.post('/users/login', payload);
};

// export const apiGetUsers = async () => {
//   const response = await fetch('/users'); 
//   if (!response.ok) throw new Error("Failed to fetch users");
//   return response.json();
// };


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