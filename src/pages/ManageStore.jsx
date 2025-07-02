import React, { useEffect, useState } from "react";
import { apiGetLocations, apiEditLocation, apiAddLocation } from "../servicess/tali"; // Fixed import

const ManageStore = () => {
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
        await apiAddLocation(formData); // Use the proper API function
      }
      await fetchLocations();
      setShowForm(false);
      // Reset form data
      setFormData({
        assetLocation: "",
        address: "",
        street: "",
        number: "",
      });
    } catch (err) {
      console.error("Failed to submit form:", err);
      // You might want to show an error message to the user here
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Manage Store</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Store
        </button>
      </div>

      {/* Form Modal/Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
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
        <div className="text-center text-gray-600 py-10">Loading stores...</div>
      ) : (
        <div className="space-y-4">
          {locations.map((store) => (
            <div
              key={store._id}
              className="flex justify-between items-start bg-gray-50 p-4 rounded shadow-sm"
            >
              <div className="w-1/3 font-medium text-gray-700">{store.assetLocation}</div>
              <div className="w-2/3 text-sm text-gray-600">
                <div className="font-semibold">{store.street}</div>
                <div>{store.address}</div>
                <div>{store.number}</div>
              </div>
              <button
                onClick={() => handleEdit(store)}
                className="text-blue-500 text-sm hover:underline"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStore;