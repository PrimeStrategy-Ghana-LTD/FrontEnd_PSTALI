import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiEditAsset, apiGetLocations } from "../servicess/tali";

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

  const handleSaveChanges = async (assetId, onUpdateAsset) => {
    if (!newLocation) {
      toast.error("Please select a location");
      return;
    }

    if (!justification.trim()) {
      toast.error("Please provide a justification");
      return;
    }

    try {
      setIsUpdating(true);

      const updateData = {
        assetLocation: newLocation,
        justification: justification.trim(),
      };

      const updatedAsset = await apiEditAsset(assetId, updateData);

      const selectedLocation = locations.find(
        (loc) => (loc._id || loc.id) === newLocation
      );
      if (selectedLocation) {
        setAssetLocation(selectedLocation.assetLocation || selectedLocation.name);
      }

      toast.success("Asset updated successfully");
      setIsEditing(false);

      // Callback to update asset in parent
      onUpdateAsset(updatedAsset, newLocation, justification.trim());
    } catch (error) {
      console.error("Error updating asset:", error);

      if (error.response?.status === 404) {
        toast.error("Asset not found");
      } else if (error.response?.status === 400) {
        toast.error("Invalid data provided");
      } else if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to edit this asset");
      } else {
        toast.error("Failed to update asset. Please try again.");
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
