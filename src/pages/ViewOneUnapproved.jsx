import React, { useEffect, useState } from "react";
import { FiEdit2, FiArrowLeft, FiUser, FiCalendar, FiMapPin } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { apiGetOneUnapprovedAsset, apiApproveAsset, apiRejectAsset } from "../servicess/tali";
import useLocationName from "../hooks/useLocationName";

const ViewOneUnapproved = () => {
  const [unapprovedAsset, setUnapprovedAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { getLocationName } = useLocationName();

  const { id } = useParams();
  const navigate = useNavigate();

  // Helper function to get location name from populated or ID field
  const getLocationDisplayName = (locationField) => {
    if (!locationField) return "N/A";
    
    // If it's a populated object
    if (typeof locationField === 'object' && locationField.assetLocation) {
      return locationField.assetLocation;
    }
    
    // If it's just an ID, use the hook
    if (typeof locationField === 'string') {
      return getLocationName(locationField);
    }
    
    return "N/A";
  };

  useEffect(() => {
    const fetchUnapprovedAsset = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const assetData = await apiGetOneUnapprovedAsset(id);
        console.log("Unapproved asset data:", assetData);
        setUnapprovedAsset(assetData);
      } catch (err) {
        console.error("Error fetching unapproved asset:", err);
        setError(err.message || "Failed to load unapproved asset data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUnapprovedAsset();
    }
  }, [id]);

  const handleDownload = () => {
    if (!unapprovedAsset) return;
    
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Unapproved Asset Details", 20, 20);
      doc.setFontSize(12);
      doc.text(`Asset ID: ${unapprovedAsset._id || "N/A"}`, 20, 40);
      doc.text(`Asset Name: ${unapprovedAsset.assetName || "N/A"}`, 20, 50);
      doc.text(`Asset VIN: ${unapprovedAsset.assetId || "N/A"}`, 20, 60);
      doc.text(`Current Location: ${getLocationDisplayName(unapprovedAsset.assetLocation)}`, 20, 70);
      doc.text(`New Location: ${getLocationDisplayName(unapprovedAsset.newLocation)}`, 20, 80);
      doc.text(`Inspected By: ${unapprovedAsset.inspectedBy?.userName || unapprovedAsset.inspectedBy || "N/A"}`, 20, 90);
      doc.text(`Make: ${unapprovedAsset.make || "N/A"}`, 20, 100);
      doc.text(`Model: ${unapprovedAsset.model || "N/A"}`, 20, 110);
      doc.text(`Year: ${unapprovedAsset.year || "N/A"}`, 20, 120);
      doc.text(`Status: ${unapprovedAsset.status || "N/A"}`, 20, 130);
      doc.text(`Category: ${unapprovedAsset.category || "N/A"}`, 20, 140);
      doc.text(`Origin: ${unapprovedAsset.origin || "N/A"}`, 20, 150);
      doc.text(`Created: ${unapprovedAsset.createdAt ? new Date(unapprovedAsset.createdAt).toLocaleDateString() : "N/A"}`, 20, 160);
      doc.save(`unapproved_asset_${unapprovedAsset._id || "details"}.pdf`);
      
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'unavailable':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleApprove = async () => {
    if (!unapprovedAsset?._id) return;
    
    try {
      setActionLoading(true);
      await apiApproveAsset(unapprovedAsset._id);
      toast.success("Asset approved successfully");
      navigate("/dashboard/asset-approvals"); // Navigate back to approvals list
    } catch (error) {
      console.error("Approval failed:", error);
      toast.error("Approval failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!unapprovedAsset?._id) return;
    
    try {
      setActionLoading(true);
      await apiRejectAsset(unapprovedAsset._id);
      toast.success("Asset rejected successfully");
      navigate("/dashboard/asset-approvals"); // Navigate back to approvals list
    } catch (error) {
      console.error("Rejection failed:", error);
      toast.error("Rejection failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading unapproved asset details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 text-lg font-semibold">Error loading unapproved asset</p>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!unapprovedAsset) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">Unapproved asset not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Unapproved Asset Details
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Download
            </button>
            <button
              onClick={handleApprove}
              disabled={actionLoading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading ? "Processing..." : "Approve"}
            </button>
            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading ? "Processing..." : "Reject"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Top Section */}
          <div className="p-8">
            <div className="flex gap-8">
              {/* Asset Image */}
              <div className="flex-shrink-0">
                <img
                  src={unapprovedAsset.assetImage || "/default-asset.png"}
                  alt={unapprovedAsset.assetName || "Asset"}
                  className="w-96 h-64 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.src = "/default-asset.png";
                  }}
                />
              </div>

              {/* Asset Info */}
              <div className="flex-1 max-w-md">
                <div className="mb-4">
                  <h2 className="text-[22px] font-bold mb-2">
                    {unapprovedAsset.assetName || "Unnamed Asset"}
                  </h2>
                  <span className={`inline-block px-3 py-1 text-sm rounded-full border ${getStatusColor(unapprovedAsset.status)}`}>
                    {unapprovedAsset.status || "Pending Approval"}
                  </span>
                </div>
                
                <div className="mb-6 space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm">Asset ID</p>
                    <p className="font-semibold text-gray-900">{unapprovedAsset._id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Asset VIN</p>
                    <p className="font-semibold text-gray-900">{unapprovedAsset.assetId || "N/A"}</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-3">Location Change Request</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FiMapPin className="w-4 h-4 text-yellow-600" />
                      <span className="text-yellow-700">From:</span>
                      <span className="font-medium text-yellow-900">{getLocationDisplayName(unapprovedAsset.assetLocation)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiMapPin className="w-4 h-4 text-yellow-600" />
                      <span className="text-yellow-700">To:</span>
                      <span className="font-medium text-yellow-900">{getLocationDisplayName(unapprovedAsset.newLocation)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inspection Details
                  </label>
                  <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 min-h-[72px]">
                    <p><strong>Inspected By:</strong> {unapprovedAsset.inspectedBy?.userName || unapprovedAsset.inspectedBy || "N/A"}</p>
                    <p><strong>Date:</strong> {formatDate(unapprovedAsset.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Asset Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Category:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {unapprovedAsset.category || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Make:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {unapprovedAsset.make || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Model:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {unapprovedAsset.model || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Year:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {unapprovedAsset.year || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Origin:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {unapprovedAsset.origin || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Status:</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(unapprovedAsset.status)}`}>
                      {unapprovedAsset.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Condition:</span>
                    <span className="text-gray-900 text-sm font-medium">{unapprovedAsset.condition || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Mileage:</span>
                    <span className="text-gray-900 text-sm font-medium">{unapprovedAsset.mileage || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Fuel Type:</span>
                    <span className="text-gray-900 text-sm font-medium">{unapprovedAsset.fuelType || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Transmission:</span>
                    <span className="text-gray-900 text-sm font-medium">{unapprovedAsset.transmission || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Exterior Color:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {unapprovedAsset.exteriorColor || unapprovedAsset.exteriorColour || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Interior Color:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {unapprovedAsset.interiorColor || unapprovedAsset.interiorColour || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Asset History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset History</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Created:</span> {formatDate(unapprovedAsset.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Last Updated:</span> {formatDate(unapprovedAsset.updatedAt)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Approval Status:</span> Pending Review
                  </p>
                </div>
              </div>

              {/* Inspector Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspector Information</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Inspected By:</span> {unapprovedAsset.inspectedBy?.userName || unapprovedAsset.inspectedBy || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Inspector Email:</span> {unapprovedAsset.inspectedBy?.email || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Inspection Date:</span> {formatDate(unapprovedAsset.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOneUnapproved;