
import Sales from "../assets/images/Sales.png";
import house from "../assets/images/house.png";
import plane from "../assets/images/plane.png";
import Cost from "../assets/images/Cost.png";
import Purchase from "../assets/images/Purchase.png";
import Building from "../assets/images/Building.png";
import Cancel from "../assets/images/Cancel.png";
import Profit from "../assets/images/Profit.png";
import AssetSummaryChart from "./AssetSummaryChart";
import Quantity from "../assets/images/Quantity.png";
import direction from "../assets/images/direction.png";
import Suppliers from "../assets/images/Suppliers.png";
import Categories from "../assets/images/Categories.png";
import AssetManagementGraph from "./AssetManagementGraph";

const AssetOverview = () => {
    return (
        <div className='bg-[#f0f1f3] min-h-screen p-4 flex flex-row gap-5'>
            <div className="space-y-4 w-[40%]">
                <div className='border-2 bg-white border-white p-4 rounded-md shadow-sm'>
                    <p className='font-semibold mb-4'>Asset Overview</p>
                    <div className='flex flex-row gap-8 items-center'>
                        <div className='flex flex-col items-center'>
                            <img src={Sales} alt="" className='mb-2 w-6 h-6' />
                            <div className='flex flex-row gap-3 text-center'>
                                <p className='text-[13px]'>823</p>
                                <p className='text-gray-600 text-[13px]'>Cars</p>
                            </div>
                        </div>
                        
                        <div className='border-l-2 border-gray-200 h-12'></div>
                        
                        <div className='flex flex-col items-center'>
                            <img src={house} alt="" className='mb-2 w-6 h-6' />
                            <div className='flex flex-row gap-3 text-center'>
                                <p className='text-[13px]'>423</p>
                                <p className='text-gray-600 text-[13px]'>Trucks</p>
                            </div>
                        </div>
                        
                        <div className='border-l-2 border-gray-200 h-12'></div>
                        
                        <div className='flex flex-col items-center'>
                            <img src={plane} alt="" className='mb-2 w-6 h-6' />
                            <div className='flex flex-row gap-3 text-center'>
                                <p className='text-[13px]'>156</p>
                                <p className='text-gray-600 text-[13px]'>Bikes</p>
                            </div>
                        </div>
                        
                        <div className='border-l-2 border-gray-200 h-12'></div>
                        
                        <div className='flex flex-col items-center'>
                            <img src={Cost} alt="" className='mb-2 w-6 h-6' />
                            <div className='flex flex-row gap-3 text-center'>
                                <p className='text-[13px]'>89</p>
                                <p className='text-gray-600 text-[13px]'>Boats</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-2 bg-white border-white p-4 rounded-md shadow-sm'>
                    <p className='font-semibold mb-4'>Assignments Overview</p>
                    <div className='flex flex-row gap-8 items-center'>
                        <div className='flex flex-col items-center'>
                            <img src={Purchase} alt="" className='mb-2 w-6 h-6' />
                            <div className='flex flex-row gap-3 text-center'>
                                <p className='text-[13px]'>82</p>
                                <p className='text-gray-600 text-[13px]'>Pending</p>
                            </div>
                        </div>
                        
                        <div className='border-l-2 border-gray-200 h-12'></div>
                        
                        <div className='flex flex-col items-center'>
                            <img src={Building} alt="" className='mb-2 w-6 h-6' />
                            <div className='flex flex-row gap-3 text-center'>
                                <p className='text-[13px]'>43</p>
                                <p className='text-gray-600 text-[13px]'>Location</p>
                            </div>
                        </div>
                        
                        <div className='border-l-2 border-gray-200 h-12'></div>
                        
                        <div className='flex flex-col items-center'>
                            <img src={Cancel} alt="" className='mb-2 w-6 h-6' />
                            <div className='flex flex-row gap-1 text-center'>
                                <p className='text-[13px]'>56</p>
                                <p className='text-gray-600 text-[13px]'>N/A</p>
                            </div>
                        </div>
                        
                        <div className='border-l-2 border-gray-200 h-12'></div>
                        
                        <div className='flex flex-col items-center'>
                            <img src={Profit} alt="" className='mb-2 w-6 h-6' />
                            <div className='flex flex-row gap-3 text-center'>
                                <p className='text-[13px]'>89</p>
                                <p className='text-gray-600 text-[13px]'>Total</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <AssetSummaryChart />
            </div>
            <div className="w-[23%] space-y-4">
                <div className='border-2 bg-white border-white p-4 rounded-md shadow-sm'>
                    <p className='font-semibold mb-1'>Asset Summary</p>
                    <div className='flex flex-row gap-8 items-center'>
                        <div className='flex flex-col items-center'>
                            <img src={Quantity} alt="" className=' w-6 h-6' />
                            <div className='text-center'>
                                <p className='text-[13px]'>823</p>
                                <p className='text-gray-600 text-[13px]'>Asset Assigned</p>
                            </div>
                        </div>
                        
                        <div className='border-l-2 border-gray-200 h-12'></div>
                        
                        <div className='flex flex-col items-center'>
                            <img src={direction} alt="" className=' w-6 h-6' />
                            <div className=' text-center'>
                                <p className='text-[13px]'>423</p>
                                <p className='text-gray-600 text-[13px]'>Asset In Store</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='border-2 bg-white border-white p-4 rounded-md shadow-sm'>
                    <p className='font-semibold mb-1'>Report Summary</p>
                    <div className='flex flex-row gap-8 items-center'>
                        <div className='flex flex-col items-center'>
                            <img src={Suppliers} alt="" className=' w-6 h-6' />
                            <div className=' text-center'>
                                <p className='text-[13px]'>823</p>
                                <p className='text-gray-600 text-[13px]'>Number of User</p>
                            </div>
                        </div>
                        
                        <div className='border-l-2 border-gray-200 h-12'></div>
                        
                        <div className='flex flex-col items-center'>
                            <img src={Categories} alt="" className=' w-6 h-6' />
                            <div className=' text-center'>
                                <p className='text-[13px]'>423</p>
                                <p className='text-gray-600 text-[13px]'>Number of Assigns</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <AssetManagementGraph />
        </div>
    )
}

export default AssetOverview;