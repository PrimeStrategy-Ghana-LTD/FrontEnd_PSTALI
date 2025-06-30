import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Sidebar1 from "../components/Sidebar1";
import Searchbar from "../components/Searchbar";
import { useParams } from "react-router-dom";
import Mileage from "../assets/images/Mileage.png";
import Drivetrain from "../assets/images/Drivetrain.png";
import Gearbox from "../assets/images/Gearbox.png";
import Fuel from "../assets/images/Fuel.png";
import jsPDF from "jspdf";
import axios from "axios";

const ViewAsset = () => {
  const [asset, setAsset] = useState(null);
  const [locationName, setLocationName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await axios.get(
          `https://backend-ps-tali.onrender.com/assets/${id}`
        );
        setAsset(res.data);
        if (res.data.assetLocation) {
          try {
            const locationRes = await axios.get(
              `https://backend-ps-tali.onrender.com/locations/${res.data.assetLocation}`
            );
            setLocationName(
              locationRes.data.assetLocation || "Unknown Location"
            );
          } catch {
            setLocationName("Location not found");
          }
        }
      } catch (err) {
        console.error("Error fetching asset:", err);
      }
    };
    fetchAsset();
  }, [id]);

  const handleDownload = () => {
    if (!asset) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Asset Details", 10, 10);
    doc.setFontSize(12);
    doc.text(`Asset Name: ${asset.assetName || "N/A"}`, 10, 20);
    doc.text(`Asset ID: ${asset.assetId || "N/A"}`, 10, 30);
    doc.text(`Category: ${asset.category || "N/A"}`, 10, 40);
    doc.text(`Location: ${locationName || "N/A"}`, 10, 50);
    doc.text(`Status: ${asset.status || "N/A"}`, 10, 60);
    doc.text(`Assigned To: ${asset.assignedTo?.name || "Unassigned"}`, 10, 70);
    doc.text(`Contact: ${asset.assignedTo?.contact || "No contact"}`, 10, 80);
    doc.text("Stock Locations:", 10, 95);
    asset.stockLocations?.forEach((loc, index) => {
      doc.text(
        `${index + 1}. ${loc.location || loc.storeName} - ${loc.quantity}`,
        12,
        105 + index * 10
      );
    });
    doc.save(`${asset.assetName || "asset"}_details.pdf`);
  };

  return (
    <div className="flex">
      {/* <Sidebar1 />
      <div className="flex flex-col w-full">
        <Searchbar /> */}
        <div className="bg-[#f0f1f3] p-6 min-h-screen">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex gap-2 justify-end ">
              <button className="flex items-center gap-1 border px-3 py-1 rounded text-sm text-gray-600 border-gray-300">
                <FiEdit2 /> Edit
              </button>
              <button
                onClick={handleDownload}
                className="border px-3 py-1 rounded text-sm text-gray-600 border-gray-300"
              >
                Download
              </button>
            </div>
            <div className="flex justify-between items-start ">
              <div className="flex gap-4 w-[1027px] h-[340px] border-">
                <img
                  src={asset?.assetImage || "/placeholder.jpg"}
                  alt="Asset"
                  className="w-[467px] h-[310px] object-cover rounded-md border border-gray-200"
                />
                <div className="w-[444px] h-[292px]">
                  <h2 className="text-[22px] font-bold mb-2">
                    {asset?.assetName}
                  </h2>
                  <p className="text-sm text-gray-500 border-2 border-[#cff7d3] bg-[#cff7d3] rounded-md px-3 py-2 w-44">
                    {locationName}
                  </p>
                  <p className="text-[16px] mt-2 text-gray-600 font-bold">
                    VIN: {asset?.assetId || "N/A"}
                  </p>
                  <button className="mt-3 bg-gray-800 text-white text-md w-full rounded-lg py-3">
                    Assign
                  </button>
                  <div className="mt-3">
                    <label className="text-[#1e1e1e] text-[16px] font-semibold">
                      Justification
                    </label>
                    <textarea
                      rows={3}
                      className="w-full border mt-1 p-2 rounded-md text-md border-gray-300 "
                      placeholder="Enter justification..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <div>
                  <h3 className="text-[21px] font-bold text-gray-700 mb-2">
                    Features
                  </h3>
                  <div>
                    <ul className="grid grid-cols-2 text-sm text-gray-600 space-y-1 gap-4">
                      <li className="flex gap-2">
                        <img src={Mileage} alt="" />
                        <div>
                          <strong>Mileage:</strong>
                          <p>{asset?.mileage || "N/A"}</p>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <img src={Drivetrain} alt="" />
                        <div className="">
                          <strong>Drivetrain:</strong>
                          <p> {asset?.drivetrain || "N/A"}</p>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <img src={Gearbox} alt="" />
                        <div>
                          <strong>Doors:</strong>
                          <p>{asset?.doors || "N/A"}</p>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <img src={Fuel} alt="" />
                        <div>
                          <strong>Max Seating:</strong>
                          <p>{asset?.maxSeating || "N/A"}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Overview
                </h3>
                <div className="grid grid-cols-2">
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      <strong>Make:</strong> {asset?.make || "N/A"}
                    </li>
                    <li>
                      <strong>Model:</strong> {asset?.model || "N/A"}
                    </li>
                    <li>
                      <strong>Year:</strong> {asset?.year || "N/A"}
                    </li>
                    <li>
                      <strong>Condition:</strong> {asset?.condition || "N/A"}
                    </li>
                    <li>
                      <strong>Body Type:</strong> {asset?.bodyType || "N/A"}
                    </li>
                    <li>
                      <strong>Color:</strong> {asset?.color || "N/A"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mt-8 w-[444px]">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Inspection Details
                </h3>
                <p className="text-md text-gray-600">Inspected by: Kofi Baah</p>
                <p className="text-md text-gray-600">
                  Approved by: Jordan Owusu
                </p>
                <p className="text-sm text-gray-600">
                  Date Uploaded: 18 June, 2025
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Similar Assets
                </h3>
                <div className="flex flex-col gap-4 text-sm text-gray-600">
                  <div>
                    <img
                      src="/car-placeholder.png"
                      alt="Asset"
                      className="w-28 h-16 rounded-md object-cover"
                    />
                    <p>2023 Toyota Corolla</p>
                  </div>
                  <div>
                    <img
                      src="/car-placeholder.png"
                      alt="Asset"
                      className="w-28 h-16 rounded-md object-cover"
                    />
                    <p>2022 Honda Civic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default ViewAsset;
