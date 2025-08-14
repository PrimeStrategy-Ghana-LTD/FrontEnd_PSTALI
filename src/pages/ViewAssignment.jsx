import React, { useEffect, useState } from "react";
import { FiEdit2, FiArrowLeft, FiUser, FiCalendar, FiMapPin } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { apiGetOneAssignment } from "../servicess/tali";
import useLocationName from "../hooks/useLocationName";

const ViewAssignment = () => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getLocationName } = useLocationName();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const assignmentData = await apiGetOneAssignment(id);
        setAssignment(assignmentData);
      } catch (err) {
        console.error("Error fetching assignment:", err);
        setError(err.message || "Failed to load assignment data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAssignment();
    }
  }, [id]);

  const handleDownload = () => {
    if (!assignment) return;
    
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Assignment Details", 20, 20);
      doc.setFontSize(12);
      doc.text(`Assignment ID: ${assignment.assignmentId || assignment._id || "N/A"}`, 20, 40);
      doc.text(`Asset: ${assignment.asset?.assetName || "N/A"}`, 20, 50);
      doc.text(`Asset VIN: ${assignment.asset?.assetId || "N/A"}`, 20, 60);
      doc.text(`Assigned To: ${assignment.assignedTo?.name || assignment.assignedTo || "N/A"}`, 20, 70);
      doc.text(`Assigned By: ${assignment.assignedBy?.name || assignment.assignedBy || "N/A"}`, 20, 80);
      doc.text(`Location: ${getLocationName(assignment.location) || "N/A"}`, 20, 90);
      doc.text(`Start Date: ${assignment.startDate ? new Date(assignment.startDate).toLocaleDateString() : "N/A"}`, 20, 100);
      doc.text(`End Date: ${assignment.endDate ? new Date(assignment.endDate).toLocaleDateString() : "N/A"}`, 20, 110);
      doc.text(`Status: ${assignment.status || "N/A"}`, 20, 120);
      doc.text(`Purpose: ${assignment.purpose || "N/A"}`, 20, 130);
      doc.text(`Notes: ${assignment.notes || "N/A"}`, 20, 140);
      doc.save(`assignment_${assignment.assignmentId || assignment._id || "details"}.pdf`);
      
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
      case 'terminated':
        return 'bg-red-100 text-red-800 border-red-200';
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

  const handleEdit = () => {
    navigate(`/dashboard/assignments/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignment details...</p>
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
          <p className="text-red-600 text-lg font-semibold">Error loading assignment</p>
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

  if (!assignment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">Assignment not found</p>
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
              Assignment Details
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Download
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
                  src={assignment.asset?.assetImage || "/placeholder-car.jpg"}
                  alt={assignment.asset?.assetName || "Asset"}
                  className="w-96 h-64 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.src = "/placeholder-car.jpg";
                  }}
                />
              </div>

              {/* Assignment Info */}
              <div className="flex-1 max-w-md">
                <div className="mb-4">
                  <h2 className="text-[22px] font-bold mb-2">
                    {assignment.asset?.assetName || "Asset Assignment"}
                  </h2>
                  <span className={`inline-block px-3 py-1 text-sm rounded-full border ${getStatusColor(assignment.status)}`}>
                    {assignment.status || "Unknown Status"}
                  </span>
                </div>
                
                <div className="mb-6 space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm">Assignment ID</p>
                    <p className="font-semibold text-gray-900">{assignment.assignmentId || assignment._id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Asset VIN</p>
                    <p className="font-semibold text-gray-900">{assignment.asset?.assetId || "N/A"}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Assignment Period</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FiCalendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Start:</span>
                      <span className="font-medium">{formatDate(assignment.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiCalendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">End:</span>
                      <span className="font-medium">{formatDate(assignment.endDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose
                  </label>
                  <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 min-h-[72px]">
                    {assignment.purpose || "No purpose specified"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Assignment Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Assignment Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Assigned To:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {assignment.assignedTo?.name || assignment.assignedTo || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Assigned By:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {assignment.assignedBy?.name || assignment.assignedBy || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Location:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {getLocationName(assignment.location) || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Assignment Date:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {formatDate(assignment.assignmentDate || assignment.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Status:</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(assignment.status)}`}>
                      {assignment.status || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Asset Overview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Make:</span>
                    <span className="text-gray-900 text-sm font-medium">{assignment.asset?.make || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Model:</span>
                    <span className="text-gray-900 text-sm font-medium">{assignment.asset?.model || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Year:</span>
                    <span className="text-gray-900 text-sm font-medium">{assignment.asset?.year || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Condition:</span>
                    <span className="text-gray-900 text-sm font-medium">{assignment.asset?.condition || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Mileage:</span>
                    <span className="text-gray-900 text-sm font-medium">{assignment.asset?.mileage || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Fuel Type:</span>
                    <span className="text-gray-900 text-sm font-medium">{assignment.asset?.fuelType || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Exterior Color:</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {assignment.asset?.exteriorColor || assignment.asset?.exteriorColour || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {assignment.notes && (
            <div className="px-8 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{assignment.notes}</p>
              </div>
            </div>
          )}

          {/* Activity Section */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Assignment History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment History</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Created:</span> {formatDate(assignment.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Last Updated:</span> {formatDate(assignment.updatedAt)}
                  </p>
                  {assignment.completedAt && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Completed:</span> {formatDate(assignment.completedAt)}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Assignee Email:</span> {assignment.assignedTo?.email || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Manager:</span> {assignment.assignedBy?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Manager Email:</span> {assignment.assignedBy?.email || "N/A"}
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

export default ViewAssignment;