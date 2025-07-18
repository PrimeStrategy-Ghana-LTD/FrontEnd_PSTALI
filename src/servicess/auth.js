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
            "Content-Type": "multipart/form-data"
        }
    });
};
console.log("Auth service loaded");


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