import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { apiGetLocations, apiGetOneAsset, apiUpdateAssetLocation } from "../servicess/tali";
import { useParams, useNavigate } from "react-router-dom";
import useLocationName from "../hooks/useLocationName";
import { useEditAsset } from "../hooks/useEditAsset";

const AssignLocationPage = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [assetLoading, setAssetLoading] = useState(true);
  const [assetError, setAssetError] = useState("");
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationError, setLocationError] = useState("");
  const [locationLoading, setLocationLoading] = useState(true);

  const { getLocationName } = useLocationName();
  const navigate = useNavigate();

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://backend-ps-tali.onrender.com/users/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Fetch asset
  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setAssetError("");
        const data = await apiGetOneAsset(id);
        console.log("Fetched asset:", data); // Debug log
        setAsset(data);
      } catch (error) {
        setAssetError("Failed to load asset details.");
        console.error("Error fetching asset:", error);
      } finally {
        setAssetLoading(false);
      }
    };

    if (id) fetchAsset();
  }, [id]);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLocationError("");
        const locationData = await apiGetLocations();
        console.log("Fetched locations:", locationData); // Debug log
        setLocations(
          Array.isArray(locationData.locations) ? locationData.locations : []
        );
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocationError("Failed to load locations");
      } finally {
        setLocationLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // useEditAsset hook setup
  const {
    newLocation,
    justification,
    isUpdating,
    setNewLocation,
    setJustification,
    handleSaveChanges,
  } = useEditAsset(asset, locations);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleAssign = async () => {
    console.log("Assigning asset:", id, "to location:", newLocation); // Debug log
    
    // Validate inputs
    if (!newLocation) {
      alert("Please select a location");
      return;
    }

    // Use the updated handleSaveChanges with success callback
    await handleSaveChanges(id, () => {
      // Navigate back to assets after successful assignment
      navigate("/dashboard/assets");
    });
  };

  // Debug: Log current state
  useEffect(() => {
    console.log("Current state:", {
      asset,
      newLocation,
      justification,
      locations: locations.length
    });
  }, [asset, newLocation, justification, locations]);

  return (
    <div className="p-6 bg-[#ffffff]">
      <div
        className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer mb-8"
        onClick={() => navigate("/dashboard/assets")}
      >
        <FiArrowLeft className="w-5 h-5" />
        <p>Assign Asset</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col items-center md:items-start">
          {assetLoading ? (
            <div className="w-[400px] h-64 flex items-center justify-center border rounded-lg mb-6">
              <p className="text-gray-500">Loading image...</p>
            </div>
          ) : (
            <img
              src={asset?.assetImage}
              alt={asset?.assetName || "Asset Image"}
              className="w-[400px] h-64 object-contain mb-6"
            />
          )}

          <div className="mt-6 text-md space-y-1">
            <p>
              <span className="font-semibold">Assigned By:</span>{" "}
              {user ? user.fullName || user.userName : "Loading..."}
            </p>
            <p>
              <span className="font-semibold">Role:</span>{" "}
              {user ? user.role : "Loading..."}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {today}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {user ? user.email : "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-1 text-md text-gray-800">
            <p>
              <span className="font-semibold">Asset Name:</span>{" "}
              {assetLoading ? "Loading..." : asset?.assetName || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Current Location:</span>{" "}
              {assetLoading
                ? "Loading..."
                : getLocationName(asset?.assetLocation) || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Year:</span>{" "}
              {assetLoading ? "Loading..." : asset?.year || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Asset ID:</span>{" "}
              {assetLoading ? "Loading..." : asset?.assetId || asset?._id || "N/A"}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-md font-semibold text-gray-700">
                New Location *
              </label>
              {locationError && (
                <p className="text-sm text-red-600 mb-2">{locationError}</p>
              )}
              <select
                value={newLocation}
                onChange={(e) => {
                  console.log("Selected location:", e.target.value); // Debug log
                  setNewLocation(e.target.value);
                }}
                className="w-[363px] mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Location</option>
                {locationLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  locations.map((loc) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.assetLocation || loc.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="justification"
                className="text-md font-medium text-gray-700 mb-1"
              >
                Justification (Optional)
              </label>
              <textarea
                id="justification"
                rows="3"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 w-[363px]"
                placeholder="Reason for location change (optional)"
              />
              <small className="text-gray-500 mt-1">
                Note: Justification will be saved separately after location update
              </small>
            </div>

            <div className="flex gap-4">
              <button
                className="px-6 py-2 bg-[#0A2343] text-white rounded hover:opacity-90 text-sm disabled:opacity-50"
                onClick={handleAssign}
                disabled={isUpdating || !newLocation}
              >
                {isUpdating ? "Assigning..." : "Assign"}
              </button>
              
              <button
                className="px-6 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-sm"
                onClick={() => navigate("/dashboard/assets")}
                disabled={isUpdating}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignLocationPage;