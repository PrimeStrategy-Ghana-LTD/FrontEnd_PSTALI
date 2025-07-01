import React, { useEffect, useState } from "react";
import { FiEdit2, FiArrowLeft } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import MileageIcon from "../assets/images/Mileage.png";
import DrivetrainIcon from "../assets/images/Drivetrain.png";
import GearboxIcon from "../assets/images/Gearbox.png";
import FuelIcon from "../assets/images/Fuel.png";
import { apiGetOneAsset, apiGetLocations, apiEditAsset } from "../servicess/tali";

const ViewAsset = () => {
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assetLocation, setAssetLocation] = useState("Location Unknown");
  const [locations, setLocations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [justification, setJustification] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const assetData = await apiGetOneAsset(id);
        setAsset(assetData);

        const locationResponse = await apiGetLocations();
        const locationData = Array.isArray(locationResponse)
          ? locationResponse
          : locationResponse.locations || [];

        setLocations(locationData);

        const locationId = assetData?.assetLocation?._id || assetData?.assetLocation;
        const matchedLocation = locationData.find(
          (loc) => loc._id === locationId || loc.id === locationId
        );

        if (matchedLocation) {
          setAssetLocation(matchedLocation.assetLocation || matchedLocation.name);
        }

        setNewLocation(locationId); // Preselect current location
        setJustification(assetData.justification || "");
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleDownload = () => {
    if (!asset) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Asset Details", 20, 20);
    doc.setFontSize(12);
    doc.text(`Asset Name: ${asset.assetName || "N/A"}`, 20, 40);
    doc.text(`VIN: ${asset.assetId || "N/A"}`, 20, 50);
    doc.text(`Make: ${asset.make || "N/A"}`, 20, 60);
    doc.text(`Model: ${asset.model || "N/A"}`, 20, 70);
    doc.text(`Year: ${asset.year || "N/A"}`, 20, 80);
    doc.text(`Condition: ${asset.condition || "N/A"}`, 20, 90);
    doc.text(`Mileage: ${asset.mileage || "N/A"}`, 20, 100);
    doc.text(`Drivetrain: ${asset.drivetrain || "N/A"}`, 20, 110);
    doc.text(`Fuel Type: ${asset.fuelType || "N/A"}`, 20, 120);
    doc.text(`Exterior Color: ${asset.exteriorColor || asset.exteriorColour || "N/A"}`, 20, 130);
    doc.text(`Status: ${asset.status || "N/A"}`, 20, 140);
    doc.text(`Location: ${assetLocation}`, 20, 150);
    doc.save(`${asset.assetName || "asset"}_details.pdf`);
  };

  const handleSaveChanges = async () => {
    try {
      await apiEditAsset(id, {
        assetLocation: newLocation,
        justification,
      });
      toast.success("Asset updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update asset");
    }
  };

  const handleAssign = () => {
    // Add your assign logic here
    console.log("Assign button clicked");
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading asset details...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">Error: {error}</div>;
  }

  if (!asset) {
    return <div className="flex items-center justify-center min-h-screen">Asset not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {asset.year} {asset.make} {asset.model}
            </h1>
          </div>
          <div className="flex gap-3">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit
              </button>
            )}
            <button
              onClick={handleDownload}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Content - Edit Mode or View Mode */}
      {isEditing ? (
        <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Panel */}
          <div>
            <img
              src={asset.assetImage || "/placeholder-car.jpg"}
              className="w-full h-64 object-cover rounded-lg border"
              alt="Asset"
            />
            <div className="mt-6 text-sm space-y-1">
              <p><strong>Assigned By:</strong> Kojo Baah</p>
              <p><strong>Role:</strong> Asset Manager</p>
              <p><strong>Date:</strong> 20th June, 2025</p>
              <p><strong>Email:</strong> kojo.baah@tali.com</p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600">Asset Name</p>
              <p className="text-xl font-semibold text-gray-900">{asset.assetName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Current Location</p>
              <p className="text-lg text-gray-900">{assetLocation}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Year</p>
              <p className="text-lg text-gray-900">{asset.year}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">VIN</p>
              <p className="text-lg text-gray-900">{asset.assetId}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">New Location</label>
              <select
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select New Location</option>
                {locations.map((loc) => (
                  <option key={loc._id || loc.id} value={loc._id || loc.id}>
                    {loc.assetLocation || loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Justification</label>
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Discard
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Add Asset
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Main Content - View Mode */
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Top Section */}
            <div className="p-8">
              <div className="flex gap-8">
                {/* Asset Image */}
                <div className="flex-shrink-0">
                  <img
                    src={asset.assetImage || "/placeholder-car.jpg"}
                    alt={asset.assetName}
                    className="w-96 h-64 object-cover rounded-lg border border-gray-200"
                  />
                </div>

                {/* Asset Info */}
                <div className="flex-1 max-w-md">
                  <div className="mb-4">
                    <h2 className="text-[22px] font-bold mb-2">
                      {asset?.assetName}
                    </h2>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">
                      {assetLocation}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm">VIN</p>
                    <p className="font-semibold text-gray-900">{asset.assetId}</p>
                  </div>

                  <button
                    onClick={handleAssign}
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Assign
                  </button>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Justification
                    </label>
                    <textarea
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Answer the frequently asked question in a simple sentence, a longer paragraph, or even in a list."
                      defaultValue={asset.justification || ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features and Overview Section */}
            <div className="px-8 pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Features</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img src={MileageIcon} alt="Mileage" className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Mileage</p>
                        <p className="text-gray-600 text-sm">{asset.mileage || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img src={DrivetrainIcon} alt="Drivetrain" className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Drivetrain</p>
                        <p className="text-gray-600 text-sm">{asset.drivetrain || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img src={GearboxIcon} alt="Doors" className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Doors</p>
                        <p className="text-gray-600 text-sm">{asset.doorCount || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img src={FuelIcon} alt="Max Seating" className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Max Seating</p>
                        <p className="text-gray-600 text-sm">{asset.seatingCapacity || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Make:</span>
                      <span className="text-gray-900 text-sm font-medium">{asset.make || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Model:</span>
                      <span className="text-gray-900 text-sm font-medium">{asset.model || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Year:</span>
                      <span className="text-gray-900 text-sm font-medium">{asset.year || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Exterior colour:</span>
                      <span className="text-gray-900 text-sm font-medium">{asset.exteriorColor || asset.exteriorColour || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Condition:</span>
                      <span className="text-gray-900 text-sm font-medium">{asset.condition || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Doors:</span>
                      <span className="text-gray-900 text-sm font-medium">{asset.doorCount || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Maximum seating:</span>
                      <span className="text-gray-900 text-sm font-medium">{asset.seatingCapacity || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="px-8 pb-8">
              <div className="flex gap-12">
                {/* Inspection Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Inspected by:</span> {asset.inspectedBy?.name || "Kofi Baah"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Approved by:</span> {asset.approvedBy?.name || "Jordan Owusu"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Date Uploaded:</span> {
                        asset.dateUploaded 
                          ? new Date(asset.dateUploaded).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })
                          : "18 June, 2025"
                      }
                    </p>
                  </div>
                </div>

                {/* Similar Assets */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Assets</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="/placeholder-car.jpg"
                        alt="Similar Asset"
                        className="w-20 h-12 object-cover rounded-md border border-gray-200"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">2023 Toyota Camry</p>
                        <p className="text-xs text-gray-500">Available</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src="/placeholder-car.jpg"
                        alt="Similar Asset"
                        className="w-20 h-12 object-cover rounded-md border border-gray-200"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">2022 Honda Accord</p>
                        <p className="text-xs text-gray-500">Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAsset;