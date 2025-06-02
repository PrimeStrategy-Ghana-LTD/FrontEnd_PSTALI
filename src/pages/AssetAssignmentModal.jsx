import React, { useEffect, useState } from 'react';
import { apiAddAsset } from '../servicess/tali';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssetAssignmentModal = ({isOpen, onClose, asset}) => { if (isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/25 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white p-6 rounded-md shadow-lg w-[450px] relative z-10 pointer-events-auto">
                <h2 className="text-xl font-semibold mb-4">Asset Assignment: {asset?.product}</h2>
                <form className="space-y-4">
                    <div className="flex flex-row gap-4 items-start">
                        <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center w-32 h-24">
                            <input
                                type="file"
                                name="image"
                                id="imageUpload"
                                className="opacity-0 absolute w-full h-full cursor-pointer"
                            />
                            <span className="text-xs text-gray-500 pointer-events-none">Upload</span>
                        </div>
                        <label htmlFor="imageUpload" className="text-[16px] text-blue-600 cursor-pointer hover:underline flex flex-row items-center justify-center">
                            Browse image
                        </label>
                    </div>

                    <div className='flex flex-row gap-10 items-center'>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input name="assetName" type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-5 pl-2" placeholder='Enter product name' />
                    </div>
                    <div className='flex flex-row gap-10 items-center'>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input name="assetId" type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-11 pl-2" placeholder='Enter product ID' />
                    </div>
                    <div className='flex flex-row gap-10 items-center'>
                        <label className="block text-sm font-medium text-gray-700">Location/Department</label>
                        <input name="category" type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-9 pl-2" placeholder='Select product category' />
                    </div>
                    <div className='flex flex-row gap-10 items-center'>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input name='unit' type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-[17%] pl-2" placeholder='Enter product unit' />
                    </div>
                    <div className='flex flex-row gap-10 items-center'>
                        <label className="block text-sm font-medium text-gray-700">Contact</label>
                        <input name='unit' type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-[17%] pl-2" placeholder='Enter product unit' />
                    </div>
                

                    <div className="flex justify-end gap-5 mt-4 mr-3">
                        <button
                            type="button"
                            className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                            
                        >
                            Discard
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                            Assign
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssetAssignmentModal;
