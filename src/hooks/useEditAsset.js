import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiGetLocations, apiUpdateAssetLocation } from "../servicess/tali";

export const useEditAsset = (asset) => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [justification, setJustification] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [assetLocation, setAssetLocation] = useState("Location Unknown");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationResponse = await apiGetLocations();
        const locationData = Array.isArray(locationResponse)
          ? locationResponse
          : locationResponse.locations || [];

        setLocations(locationData);

        const locationId = asset?.assetLocation?._id || asset?.assetLocation;
        setNewLocation(locationId || "");
        setJustification(asset?.justification || "");

        const matchedLocation = locationData.find(
          (loc) => loc._id === locationId || loc.id === locationId
        );
        if (matchedLocation) {
          setAssetLocation(matchedLocation.assetLocation || matchedLocation.name);
        }
      } catch (err) {
        console.error("Error fetching locations:", err);
        toast.error("Failed to fetch locations");
      }
    };

    if (asset) {
      fetchLocations();
    }
  }, [asset]);

  const handleSaveChanges = async (assetId, onSuccess) => {
    if (!newLocation) {
      toast.error("Please select a location");
      return;
    }

    // Note: Commenting out justification requirement since API doesn't accept it
    // if (!justification.trim()) {
    //   toast.error("Please provide a justification");
    //   return;
    // }

    try {
      setIsUpdating(true);

      // Match the exact API specification from documentation
      const updateData = {
        newLocation: newLocation  // Only send newLocation as per API docs
      };

      console.log('Updating asset:', assetId, 'with data:', updateData);

      // Use the API function that matches the documentation
      const updatedAsset = await apiUpdateAssetLocation(assetId, updateData);

      const selectedLocation = locations.find(
        (loc) => (loc._id || loc.id) === newLocation
      );
      if (selectedLocation) {
        setAssetLocation(selectedLocation.assetLocation || selectedLocation.name);
      }

      toast.success("Asset location updated successfully");
      setIsEditing(false);

      // Execute success callback (e.g., navigation)
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(updatedAsset);
      }
    } catch (error) {
      console.error("Error updating asset location:", error);

      // Handle specific error cases
      if (error.response?.status === 422) {
        toast.error("Invalid data format. Please check your input.");
        console.error("422 Error details:", error.response.data);
      } else if (error.response?.status === 404) {
        toast.error("Asset not found");
      } else if (error.response?.status === 400) {
        toast.error("Invalid data provided");
      } else if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to edit this asset");
      } else {
        toast.error("Failed to update asset location. Please try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    const locationId = asset?.assetLocation?._id || asset?.assetLocation;
    setNewLocation(locationId || "");
    setJustification(asset?.justification || "");
    setIsEditing(false);
  };

  return {
    locations,
    assetLocation,
    newLocation,
    justification,
    isEditing,
    isUpdating,
    setNewLocation,
    setJustification,
    setIsEditing,
    handleSaveChanges,
    handleCancelEdit,
  };
};