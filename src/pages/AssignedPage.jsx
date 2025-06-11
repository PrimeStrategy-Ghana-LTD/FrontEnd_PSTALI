import React from 'react'
import Sidebar1 from '../components/Sidebar1';
import Searchbar from '../components/Searchbar';


const AssignedPage = () => {
    return (
        <div className='flex'>
            <Sidebar1 />
            <div>
                <Searchbar />
                <div className='bg-[#f0f1f3] min-h-[90%] space-y-5 py-6 px-4'>
                    <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
                        <p className='font-semibold mb-4'>Assets</p>
                        <div className="flex gap-32">
                            <div className="flex flex-row gap-8">
                                {/* Block 1 */}
                                <div>
                                    <p className="mb-1 font-semibold">Total</p>
                                    <p className="text-[13px] mb-1 font-semibold">67</p>
                                    <p className="text-gray-600 text-[13px]">Last 7 Day</p>
                                </div>

                                {/* Block 2 */}
                                <div>
                                    <p className="mb-1 font-semibold">Total</p>
                                    <div className="flex flex-row gap-4">
                                        <div>
                                            <p className="text-[13px] mb-1 font-semibold">67</p>
                                            <p className="text-gray-600 text-[13px]">Last 7 Day</p>
                                        </div>
                                        <div>
                                            <p className="text-[13px] mb-1 font-semibold">67</p>
                                            <p className="text-gray-600 text-[13px]">Total</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Block 3 */}
                                <div>
                                    <p className="mb-1 font-semibold">Total</p>
                                    <div className="flex flex-row gap-4">
                                        <div>
                                            <p className="text-[13px] mb-1 font-semibold">67</p>
                                            <p className="text-gray-600 text-[13px]">Last 7 Day</p>
                                        </div>
                                        <div>
                                            <p className="text-[13px] mb-1 font-semibold">67</p>
                                            <p className="text-gray-600 text-[13px]">Total</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Block 4 */}
                                <div>
                                    <p className="mb-1 font-semibold">Total</p>
                                    <div className="flex flex-row gap-4">
                                        <div>
                                            <p className="text-[13px] mb-1 font-semibold">67</p>
                                            <p className="text-gray-600 text-[13px]">Last 7 Day</p>
                                        </div>
                                        <div>
                                            <p className="text-[13px] mb-1 font-semibold">67</p>
                                            <p className="text-gray-600 text-[13px]">Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
                        <div className='flex justify-between items-center mb-4'>
                            <p className='font-semibold'>Asset Assigned</p>
                            <div className='flex gap-3 text-[13px]'>
                                <button className='px-2 py-1 rounded-sm bg-[#1366d9] text-white border border-[#1366d9]'>Assign</button>
                                <button className='flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer'>Filter</button>
                                <button className='px-2 py-1 rounded-sm border border-gray-300 text-gray-600'>Download All</button>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200 mt-10'>
                                <p className='w-[%]'>Assets</p>
                                <p className='w-[%]'>User ID</p>
                                <p className='w-[%]'>Quantity</p>
                                <p className='w-[%]'>Asset ID</p>
                                <p className='w-[%] mr-'>Assign To</p>
                            </div>
                            <div className='flex justify-between text-[13px] text-gray-600 py-3 border-b border-gray-200'>
                             <p className='w-[%]'>CRV</p>
                             <p className='w-[%]'>57930</p>
                             <p className='w-[%]'>1</p>
                             <p className='w-[%]'>7404-393384</p>
                             <p className='w-[%] mr-12'>Gideon Odoom</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignedPage;