import React from "react";

const stores = [
  {
    branch: "Tema Branch",
    name: "Lisy Store",
    address: "1A/Kkhnrajaapuram, 3 rd street sulur",
    city: "Coimbatore - 6313403",
    phone: "044- 653578",
  },
  {
    branch: "Accra Branch",
    name: "Lisy Store",
    address: "54 Ramani colony, 3 rd street sulur",
    city: "Coimbatore - 63133452",
    phone: "044- 653763",
  },
  {
    branch: "Kumasi Branch",
    name: "Lisy Store",
    address: "32/ Venkatasamy layout, 3 rd street sulur",
    city: "Coimbatore - 6313403",
    phone: "044- 653578",
  },
];

const ManageStore = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Manage Store</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Store
        </button>
      </div>

      <div className="space-y-4">
        {stores.map((store, index) => (
          <div
            key={index}
            className="flex justify-between items-start bg-gray-50 p-4 rounded shadow-sm"
          >
            <div className="w-1/3 font-medium text-gray-700">{store.branch}</div>
            <div className="w-2/3 text-sm text-gray-600">
              <div className="font-semibold">{store.name}</div>
              <div>{store.address}</div>
              <div>{store.city}</div>
              <div>{store.phone}</div>
            </div>
            <button className="text-blue-500 text-sm hover:underline">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStore;
