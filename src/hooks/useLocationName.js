// src/hooks/useLocationName.js
import { useEffect, useState } from "react";
import { apiGetLocations } from "../servicess/tali"; // adjust the path if needed

const useLocationName = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await apiGetLocations();
        const locationData = Array.isArray(response)
          ? response
          : response.locations || [];
        setLocations(locationData);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations([]);
      }
    };

    fetchLocations();
  }, []);

  const getLocationName = (locationId) => {
    const location = locations.find((loc) => loc._id === locationId);
    return location ? location.assetLocation : locationId;
  };

  return { getLocationName, locations };
};

export default useLocationName;
