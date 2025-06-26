// import React, { useEffect, useState } from 'react'
// import { FiEdit2 } from "react-icons/fi";
// import Sidebar1 from '../components/Sidebar1';
// import Searchbar from '../components/Searchbar';
// import { useParams } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import axios from 'axios';

// const ViewAsset = () => {

//   const [asset, setAsset] = useState(null);
//   const [locationName, setLocationName] = useState('');
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchAsset = async () => {
//       try {
//         const res = await axios.get(`https://backend-ps-tali.onrender.com/assets/${id}`);
//         setAsset(res.data);

//         if (res.data.storeLocation) {
//           const locationRes = await axios.get(`https://backend-ps-tali.onrender.com/locations/${res.data.storeLocation}`);
//           setLocationName(locationRes.data.name || 'Unnamed Location');
//         }
//       } catch (err) {
//         console.error("Error fetching asset:", err);
//       }
//     };

//     fetchAsset();
//   }, [id]);

//   console.log("Asset:", asset);
// console.log("Stock Locations:", asset?.stockLocations);

//   const handleDownload = () => {
//   if (!asset) return;

//   const doc = new jsPDF();

//   doc.setFontSize(16);
//   doc.text('Asset Details', 10, 10);

//   doc.setFontSize(12);
//   doc.text(`Asset Name: ${asset.name || 'N/A'}`, 10, 20);
//   doc.text(`Asset ID: ${asset.assetId || 'N/A'}`, 10, 30);
//   doc.text(`Category: ${asset.category || 'N/A'}`, 10, 40);
//   doc.text(`Location: ${locationName || 'N/A'}`, 10, 50);
//   doc.text(`Assigned To: ${asset.assignedTo?.name || 'Unassigned'}`, 10, 60);
//   doc.text(`Contact: ${asset.assignedTo?.contact || 'No contact'}`, 10, 70);

//   doc.text('Stock Locations:', 10, 85);
//   asset.stockLocations?.forEach((loc, index) => {
//     doc.text(`${index + 1}. ${loc.name} - ${loc.quantity}`, 12, 95 + index * 10);
//   });

//   doc.save(`${asset.name || 'asset'}_details.pdf`);
// };

//   return (
//     <div className='flex flex-row'>
//       <Sidebar1 />
//       <div className='w-[80vw]'>
//         <Searchbar />
//         <div className='bg-[#f0f1f3] min-h-[90%] p-4'>
//           <div className='bg-white rounded-md shadow-sm border border-white p-4'>
//             <div className='flex flex-row justify-between '>
//               <p className='font-semibold mb-4'>Asset: {asset?.name || 'Unnamed Asset'}</p>
//               <div className='flex flex-row gap-3 text-[13px]'>
//                 <div className='flex flex-row border-[0.5px] px-3 gap-1 rounded-sm border-gray-300 text-gray-600'>
//                   <p className='mt-3'><FiEdit2 /></p>
//                   <button>Edit</button>
//                 </div>
//                 <button onClick={handleDownload} className='border-[0.5px] px-2 rounded-sm border-gray-300 text-gray-600'>Download</button>
//               </div>
//             </div>
//             <div>
//               <div className='flex fex-row mt-5 gap-40 text-gray-600 font-medium'>
//                 <p>Overview</p>
//                 <p>History</p>
//               </div>
//               <p className='border-b-[0.5px] border-gray-300 mt-2'></p>
//             </div>
//             <div className='flex flex-row gap-[40%]'>
//               <div>
//                 <div className=''>
//                   <p className='text-[16px] font-medium text-gray-700 mt-4'>Primary Details</p>
//                   <div className='space-y-5 mt-3'>
//                     <div className='flex flex-row gap-36'>
//                       <p className='text-gray-400 text-[16px] font-semibold'>Asset Name</p>
//                       <p className='text-gray-600 font-medium'>{asset?.assetName}</p>
//                     </div>
//                     <div className='flex flex-row gap-44'>
//                       <p className='text-gray-400 text-[16px] font-semibold'>Asset ID</p>
//                       <p className='text-gray-600 font-medium'>{asset?.assetId}</p>
//                     </div>
//                     <div className='flex flex-row gap-[37%]'>
//                       <p className='text-gray-400 text-[16px] font-semibold'>Asset Category</p>
//                       <p className='text-gray-600 font-medium'>{asset?.category}</p>
//                     </div>
//                     <div className='flex flex-row gap-32'>
//                       <p className='text-gray-400 text-[16px] font-semibold'>Asset Location</p>
//                       <p className='text-gray-600 font-medium'>{asset?.assetLocation}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <p className='text-[16px] font-medium text-gray-700 mt-20'>User Details</p>
//                   <div className='flex flex-row gap-[44%] space-y-5 mt-3'>
//                     <p className='text-gray-400 text-[16px] font-medium'>User Name</p>
//                     <p className='text-gray-600 font-medium'>{asset?.assignedTo?.name || 'Unassigned'}</p>
//                   </div>
//                   <div className='flex flex-row gap-28'>
//                     <p className='text-gray-400 text-[16px] font-semibold'>Contact Number</p>
//                     <p className='text-gray-600 font-medium'>{asset?.assignedTo?.contact || 'No contact'}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className='mt-7'>
//                 <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center w-56 h-56">
//                   {asset?.assetImage ? (
//                     <img
//                       src={asset.assetImage}
//                       alt="Asset"
//                       className="w-full h-full object-cover rounded-md"
//                     />
//                   ) : (
//                     <p className="text-gray-400 text-sm">No Image Available</p>
//                   )}
//                   <input
//                     type="file"
//                     name="image"
//                     id="imageUpload"
//                     className="opacity-0 absolute w-full h-full cursor-pointer"
//                   />
//                 </div>
//                 <div className='mt-4 space-y-5'>
//                   <div className='flex flex-row gap-3'>
//                     <p className='text-green-600'>Available:</p>
//                     <p className='text-gray-600'>20</p>
//                   </div>
//                   <p className='text-red-500'>Unavailable</p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <p className='text-[16px] font-medium text-gray-700 mt-12'>Stock Locations</p>
//               <div className='flex flex-row border-2 justify-between py-2 mt-3 bg-gray-100 border-gray-100 w-[60%] text-sm text-gray-700 font-medium'>
//                 <p className='ml-2'>Store Name</p>
//                 <p className='mr-5'>Stock in hand</p>
//               </div>
//               <div className='flex flex-col space-y-5 mt-4'>
//                 {asset?.stockLocations?.map((loc, idx) => (
//                   <div key={idx} className='flex flex-row border-b-[0.5px] border-gray-300 justify-between w-[60%]'>
//                     <p className='ml-2 text-gray-400 text-[16px] font-semibold'>{loc.location || loc.storeName}</p>
//                     <p className='mr-5 text-gray-600'>{loc.quantity}</p>
//                   </div>
//                 ))}

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ViewAsset;

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
      <Sidebar1 />
      <div className="flex flex-col w-full">
        <Searchbar />
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
                  <button className="mt-3 bg-gray-800 text-white text-md w-full rounded-lg py-3 rounded">
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
    </div>
  );
};

export default ViewAsset;
