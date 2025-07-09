import React, { useEffect, useState } from "react";
import { apiGetLocations, apiEditLocation, apiAddLocation } from "../servicess/tali";

const ManageLocation = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    assetLocation: "",
    address: "",
    street: "",
    number: "",
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await apiGetLocations();
      setLocations(res.locations || res);
    } catch (err) {
      console.error("Failed to fetch locations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (location) => {
    setEditingId(location._id);
    setFormData({
      assetLocation: location.assetLocation,
      address: location.address,
      street: location.street,
      number: location.number,
    });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      assetLocation: "",
      address: "",
      street: "",
      number: "",
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (editingId) {
        await apiEditLocation(editingId, formData);
      } else {
        await apiAddLocation(formData);
      }
      await fetchLocations();
      setShowForm(false);
      setFormData({
        assetLocation: "",
        address: "",
        street: "",
        number: "",
      });
    } catch (err) {
      console.error("Failed to submit form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      assetLocation: "",
      address: "",
      street: "",
      number: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">Manage Locations</h2>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-600"
          >
            Add Location
          </button>
        </div>

        {/* Form Modal/Overlay */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-md font-semibold mb-4">
                {editingId ? "Edit Store" : "Add Store"}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="assetLocation"
                  value={formData.assetLocation}
                  onChange={(e) => setFormData({ ...formData, assetLocation: e.target.value })}
                  placeholder="Branch Name"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Street"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Address"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="Phone Number"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  disabled={submitting}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : (editingId ? "Update" : "Add")}
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-600 py-10">Loading locations...</div>
        ) : (
          <div className="space-y-4">
            {locations.map((store) => (
              <div
                key={store._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="flex">
                  {/* Left side - Branch name with gray background */}
                  <div className="w-1/3 bg-gray-100 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-gray-800 font-medium text-lg">{store.assetLocation}</div>
                    </div>
                  </div>
                  
                  {/* Right side - Store details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-gray-900 font-medium mb-1">Lisy Store</div>
                        <div className="text-gray-600 text-sm mb-1">{store.street}</div>
                        <div className="text-gray-600 text-sm mb-1">{store.address}</div>
                        <div className="text-gray-600 text-sm">{store.number}</div>
                      </div>
                      <button
                        onClick={() => handleEdit(store)}
                        className="text-blue-500 text-sm hover:underline font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLocation;