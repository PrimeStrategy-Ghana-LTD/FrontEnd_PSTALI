// hooks/useUserName.js
import { useState, useEffect } from "react";
import axios from "axios";

const useUserName = () => {
  const [userMap, setUserMap] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://backend-ps-tali.onrender.com/users");
      const users = response.data || [];

      // Build a map from user ID to full name
      const map = {};
      users.forEach(user => {
        map[user._id] = `${user.userName}`;
      });

      setUserMap(map);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUserName = (id) => {
    return userMap[id] || "—";
  };

  return { getUserName };
};

export default useUserName;
