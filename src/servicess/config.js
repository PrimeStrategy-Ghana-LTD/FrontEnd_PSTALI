// import axios from "axios"


// const baseUrl = import.meta.env.VITE_BASE_URL

// const token = localStorage.getItem("token")

// if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

// export const apiClient = axios.create({
//     baseURL: baseUrl,
// });


import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
    baseURL: baseUrl,
});

// Add a request interceptor to dynamically add the token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem("token");
            // You might want to redirect to login page here
        }
        return Promise.reject(error);
    }
);