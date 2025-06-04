import React, { useEffect, useState } from 'react'
import { FiEdit2 } from "react-icons/fi";
import Sidebar1 from '../components/Sidebar1';
import Searchbar from '../components/Searchbar';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios';

const ViewAsset = () => {

  const [asset, setAsset] = useState(null);
  const [locationName, setLocationName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await axios.get(`https://backend-ps-tali.onrender.com/assets/${id}`);
        setAsset(res.data);

        if (res.data.storeLocation) {
          const locationRes = await axios.get(`https://backend-ps-tali.onrender.com/locations/${res.data.storeLocation}`);
          setLocationName(locationRes.data.name || 'Unnamed Location');
        }
      } catch (err) {
        console.error("Error fetching asset:", err);
      }
    };

    fetchAsset();
  }, [id]);

  console.log("Asset:", asset);
console.log("Stock Locations:", asset?.stockLocations);



  const handleDownload = () => {
  if (!asset) return;

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Asset Details', 10, 10);

  doc.setFontSize(12);
  doc.text(`Asset Name: ${asset.name || 'N/A'}`, 10, 20);
  doc.text(`Asset ID: ${asset.assetId || 'N/A'}`, 10, 30);
  doc.text(`Category: ${asset.category || 'N/A'}`, 10, 40);
  doc.text(`Location: ${locationName || 'N/A'}`, 10, 50);
  doc.text(`Assigned To: ${asset.assignedTo?.name || 'Unassigned'}`, 10, 60);
  doc.text(`Contact: ${asset.assignedTo?.contact || 'No contact'}`, 10, 70);

  doc.text('Stock Locations:', 10, 85);
  asset.stockLocations?.forEach((loc, index) => {
    doc.text(`${index + 1}. ${loc.name} - ${loc.quantity}`, 12, 95 + index * 10);
  });

  doc.save(`${asset.name || 'asset'}_details.pdf`);
};


  return (
    <div className='flex flex-row'>
      <Sidebar1 />
      <div className='w-[80vw]'>
        <Searchbar />
        <div className='bg-[#f0f1f3] min-h-[90%] p-4'>
          <div className='bg-white rounded-md shadow-sm border border-white p-4'>
            <div className='flex flex-row justify-between '>
              <p className='font-semibold mb-4'>Asset: {asset?.name || 'Unnamed Asset'}</p>
              <div className='flex flex-row gap-3 text-[13px]'>
                <div className='flex flex-row border-[0.5px] px-3 gap-1 rounded-sm border-gray-300 text-gray-600'>
                  <p className='mt-3'><FiEdit2 /></p>
                  <button>Edit</button>
                </div>
                <button onClick={handleDownload} className='border-[0.5px] px-2 rounded-sm border-gray-300 text-gray-600'>Download</button>
              </div>
            </div>
            <div>
              <div className='flex fex-row mt-5 gap-40 text-gray-600 font-medium'>
                <p>Overview</p>
                <p>History</p>
              </div>
              <p className='border-b-[0.5px] border-gray-300 mt-2'></p>
            </div>
            <div className='flex flex-row gap-[40%]'>
              <div>
                <div className=''>
                  <p className='text-[16px] font-medium text-gray-700 mt-4'>Primary Details</p>
                  <div className='space-y-5 mt-3'>
                    <div className='flex flex-row gap-36'>
                      <p className='text-gray-400 text-[16px] font-semibold'>Asset Name</p>
                      <p className='text-gray-600 font-medium'>{asset?.assetName}</p>
                    </div>
                    <div className='flex flex-row gap-44'>
                      <p className='text-gray-400 text-[16px] font-semibold'>Asset ID</p>
                      <p className='text-gray-600 font-medium'>{asset?.assetId}</p>
                    </div>
                    <div className='flex flex-row gap-[37%]'>
                      <p className='text-gray-400 text-[16px] font-semibold'>Asset Category</p>
                      <p className='text-gray-600 font-medium'>{asset?.category}</p>
                    </div>
                    <div className='flex flex-row gap-32'>
                      <p className='text-gray-400 text-[16px] font-semibold'>Asset Location</p>
                      <p className='text-gray-600 font-medium'>{asset?.assetLocation}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className='text-[16px] font-medium text-gray-700 mt-20'>User Details</p>
                  <div className='flex flex-row gap-[44%] space-y-5 mt-3'>
                    <p className='text-gray-400 text-[16px] font-medium'>User Name</p>
                    <p className='text-gray-600 font-medium'>{asset?.assignedTo?.name || 'Unassigned'}</p>
                  </div>
                  <div className='flex flex-row gap-28'>
                    <p className='text-gray-400 text-[16px] font-semibold'>Contact Number</p>
                    <p className='text-gray-600 font-medium'>{asset?.assignedTo?.contact || 'No contact'}</p>
                  </div>
                </div>
              </div>
              <div className='mt-7'>
                <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center w-56 h-56">
                  {asset?.assetImage ? (
                    <img
                      src={asset.assetImage}
                      alt="Asset"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">No Image Available</p>
                  )}
                  <input
                    type="file"
                    name="image"
                    id="imageUpload"
                    className="opacity-0 absolute w-full h-full cursor-pointer"
                  />
                </div>
                <div className='mt-4 space-y-5'>
                  <div className='flex flex-row gap-3'>
                    <p className='text-green-600'>Available:</p>
                    <p className='text-gray-600'>20</p>
                  </div>
                  <p className='text-red-500'>Unavailable</p>
                </div>
              </div>
            </div>
            <div>
              <p className='text-[16px] font-medium text-gray-700 mt-12'>Stock Locations</p>
              <div className='flex flex-row border-2 justify-between py-2 mt-3 bg-gray-100 border-gray-100 w-[60%] text-sm text-gray-700 font-medium'>
                <p className='ml-2'>Store Name</p>
                <p className='mr-5'>Stock in hand</p>
              </div>
              <div className='flex flex-col space-y-5 mt-4'>
                {asset?.stockLocations?.map((loc, idx) => (
                  <div key={idx} className='flex flex-row border-b-[0.5px] border-gray-300 justify-between w-[60%]'>
                    <p className='ml-2 text-gray-400 text-[16px] font-semibold'>{loc.location || loc.storeName}</p>
                    <p className='mr-5 text-gray-600'>{loc.quantity}</p>
                  </div>
                ))}


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAsset;