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
                        <div className='flex gap-32'>
                            <div className='flex flex-row'>
                                <div>
                                    <p className='mb-1 font-semibold'>Total</p>
                                    <p className='text-[13px] mb-1 font-semibold'>67</p>
                                    <p className='text-gray-600 text-[13px]'>Last 7 Day</p>
                                </div>
                                <div>
                                    <p className='mb-1 font-semibold'>Total</p>
                                    <div className='flex flex-row'>
                                        <div>
                                            <p className='text-[13px] mb-1 font-semibold'>67</p>
                                            <p className='text-gray-600 text-[13px]'>Last 7 Day</p>
                                        </div>
                                        <div>
                                            <p className='text-[13px] mb-1 font-semibold'>67</p>
                                            <p className='text-gray-600 text-[13px]'>Total</p>
                                        </div>
                                    </div>
                                <div>
                                    <p className='mb-1 font-semibold'>Total</p>
                                    <div className='flex flex-row'>
                                        <div>
                                            <p className='text-[13px] mb-1 font-semibold'>67</p>
                                            <p className='text-gray-600 text-[13px]'>Last 7 Day</p>
                                        </div>
                                        <div>
                                            <p className='text-[13px] mb-1 font-semibold'>67</p>
                                            <p className='text-gray-600 text-[13px]'>Total</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className='mb-1 font-semibold'>Total</p>
                                    <div className='flex flex-row'>
                                        <div>
                                            <p className='text-[13px] mb-1 font-semibold'>67</p>
                                            <p className='text-gray-600 text-[13px]'>Last 7 Day</p>
                                        </div>
                                        <div>
                                            <p className='text-[13px] mb-1 font-semibold'>67</p>
                                            <p className='text-gray-600 text-[13px]'>Total</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignedPage;