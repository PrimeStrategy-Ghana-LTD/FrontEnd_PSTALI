import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = localStorage.getItem("token")

if(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const apiClient = axios.create({
    baseURL:baseUrl,
});

// export const getUserProfile = async () => {
//     const token = localStorage.getItem("token")
//     const  response = await axios.get('https://backend-ps-tali.onrender.com', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return response.data
// }
