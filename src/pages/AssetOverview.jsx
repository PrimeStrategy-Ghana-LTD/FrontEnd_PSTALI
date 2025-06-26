import Cars from "../assets/images/Cars.png";
import house from "../assets/images/house.png";
import plane from "../assets/images/plane.png";
import Cost from "../assets/images/Cost.png";
import Way from "../assets/images/Way.png";
import Users from "../assets/images/Users.png";
import Cancel from "../assets/images/Cancel.png";
import Goods from "../assets/images/Goods.png";
import Location from "../assets/images/Location.png";
import Pending from "../assets/images/Pending.png";
import Total from "../assets/images/Total.png";
import Profit from "../assets/images/Profit.png";
import AssetSummaryChart from "./AssetSummaryChart";
import Quantity from "../assets/images/Quantity.png";
import direction from "../assets/images/direction.png";
import Suppliers from "../assets/images/Suppliers.png";
import Categories from "../assets/images/Categories.png";
import AssetManagementGraph from "./AssetManagementGraph";
import Sidebar from "../components/Sidebar";

const AssetOverview = () => {
  return (
    <div className="bg-[#f0f1f3] min-h-[90%] flex flex-row gap-5 w-full pl-[2.5%] pt-5">
      <div className="space-y-4 w-[55%]">
        <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm">
          <p className="font-semibold mb-4">Asset Overview</p>
          <div className="flex flex-row gap-12 items-center">
            <div className="flex flex-col items-center">
              <img src={Cars} alt="" className="mb-2 w-6 h-6" />
              <div className="flex flex-row gap-3 text-center">
                <p className="text-[13px]">823</p>
                <p className="text-gray-600 text-[13px]">Cars</p>
              </div>
            </div>

            <div className="border-l-2 border-gray-200 h-12"></div>

            <div className="flex flex-col items-center">
              <img src={Goods} alt="" className="mb-2 w-6 h-6" />
              <div className="flex flex-row gap-3 text-center">
                <p className="text-[13px]">423</p>
                <p className="text-gray-600 text-[13px]">Goods</p>
              </div>
            </div>

            <div className="border-l-2 border-gray-200 h-12"></div>

            <div className="flex flex-col items-center">
              <img src={Goods} alt="" className="mb-2 w-6 h-6" />
              <div className="flex flex-row gap-3 text-center">
                <p className="text-[13px]">156</p>
                <p className="text-gray-600 text-[13px]">Goods</p>
              </div>
            </div>

            <div className="border-l-2 border-gray-200 h-12"></div>

            <div className="flex flex-col items-center">
              <img src={Goods} alt="" className="mb-2 w-6 h-6" />
              <div className="flex flex-row gap-3 text-center">
                <p className="text-[13px]">89</p>
                <p className="text-gray-600 text-[13px]">Goods</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm">
          <p className="font-semibold mb-4">Assignments Overview</p>
          <div className="flex flex-row gap-9 items-center">
            <div className="flex flex-col items-center">
              <img src={Location} alt="" className="mb-2 w-6 h-6" />
              <div className="flex flex-row gap-3 text-center">
                <p className="text-[13px]">82</p>
                <p className="text-gray-600 text-[13px]">Location</p>
              </div>
            </div>

            <div className="border-l-2 border-gray-200 h-12"></div>

            <div className="flex flex-col items-center">
              <img src={Pending} alt="" className="mb-2 w-6 h-6" />
              <div className="flex flex-row gap-1 text-center">
                <p className="text-[13px]">56</p>
                <p className="text-gray-600 text-[13px]">Pending Approvals</p>
              </div>
            </div>

            <div className="border-l-2 border-gray-200 h-12"></div>

            <div className="flex flex-col items-center">
              <img src={Total} alt="" className="mb-2 w-6 h-6" />
              <div className="flex flex-row gap-3 text-center">
                <p className="text-[13px]">89</p>
                <p className="text-gray-600 text-[13px]">Total Assets</p>
              </div>
            </div>
            <div className="border-l-2 border-gray-200 h-12"></div>

            <div className="flex flex-col items-center">
              <img src={Users} alt="" className="mb-2 w-6 h-6" />
              <div className="flex flex-row gap-3 text-center">
                <p className="text-[13px]">43</p>
                <p className="text-gray-600 text-[13px]">Users</p>
              </div>
            </div>
          </div>
        </div>
        <AssetManagementGraph />
      </div>
      <div className="space-y-4 w-[40%]">
        <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm">
          <p className="font-semibold mb-1">Asset Summary</p>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <img src={Way} alt="" className="w-6 h-6" />
              <div className="text-center">
                <p className="text-[13px]">823</p>
                <p className="text-gray-600 text-[13px]">Asset Assigned</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <img src={Way} alt="" className="w-6 h-6" />
              <div className="text-center">
                <p className="text-[13px]">423</p>
                <p className="text-gray-600 text-[13px]">Asset In Store</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <img src={Way} alt="" className="w-6 h-6" />
              <div className="text-center">
                <p className="text-[13px]">31</p>
                <p className="text-gray-600 text-[13px]">Number of User</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <img src={Way} alt="" className="w-6 h-6" />
              <div className="text-center">
                <p className="text-[13px]">26</p>
                <p className="text-gray-600 text-[13px]">Number of Assigns</p>
              </div>
            </div>
          </div>
        </div>

        <AssetSummaryChart />
      </div>
    </div>
  );
};

export default AssetOverview;
