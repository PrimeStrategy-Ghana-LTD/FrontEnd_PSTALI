// // import { CalendarDays, Search, X } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import React, { useState, useEffect } from "react";
// // import { apiGetLocations, apiGetUsers } from "../servicess/tali";
// // import { useRef } from "react";

// // const AdvancedSearchModal = ({ onClose, searchTerm, setSearchTerm }) => {
// //   const navigate = useNavigate();
// //   const [isLoadingLocations, setIsLoadingLocations] = useState(false);

// //   const [filters, setFilters] = useState({
// //     search: searchTerm,
// //     category: "",
// //     assetLocation: "",
// //     model: "",
// //     origin: "",
// //     inspectedBy: "",
// //     from: "",
// //     to: "",
// //   });

// //   const [locations, setLocations] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [isLoadingUsers, setIsLoadingUsers] = useState(false);

// //   const fromInputRef = useRef();
// //   const toInputRef = useRef();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFilters((prev) => ({ ...prev, [name]: value }));
// //     if (name === "search") {
// //       setSearchTerm(value); // Update parent's state
// //     }
// //   };

// //   const handleSearch = () => {
// //     const params = new URLSearchParams();

// //     Object.entries(filters).forEach(([key, value]) => {
// //       if (value) params.append(key, value);
// //     });

// //     params.append("page", 1);
// //     params.append("limit", 10);
// //     params.append("sortBy", "createdAt");
// //     params.append("sortOrder", "desc");

// //     navigate(`/dashboard/assets?${params.toString()}`);
// //     onClose();
// //   };

// //   const handleReset = () => {
// //     setFilters({
// //       search: "",
// //       category: "",
// //       assetLocation: "",
// //       model: "",
// //       origin: "",
// //       inspectedBy: "",
// //       from: "",
// //       to: "",
// //     });
// //   };

// //   useEffect(() => {
// //     setFilters((prev) => ({ ...prev, search: searchTerm }));
// //   }, [searchTerm]);

// //   useEffect(() => {
// //     const fetchLocations = async () => {
// //       setIsLoadingLocations(true);
// //       try {
// //         const response = await apiGetLocations();
// //         console.log("Locations API Response:", response); // Debug log

// //         // Handle different response structures
// //         const locationsData =
// //           response?.data?.data ||
// //           response?.data ||
// //           response?.locations ||
// //           response;

// //         if (Array.isArray(locationsData)) {
// //           setLocations(locationsData);
// //         } else {
// //           console.error("Unexpected locations data format:", locationsData);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch locations:", error);
// //       } finally {
// //         setIsLoadingLocations(false);
// //       }
// //     };

// //     const fetchUsers = async () => {
// //       setIsLoadingUsers(true);
// //       try {
// //         const response = await apiGetUsers();
// //         console.log("Users API Response:", response);

// //         const usersData = response?.data || response?.users || response;

// //         if (Array.isArray(usersData)) {
// //           setUsers(usersData);
// //         } else {
// //           console.error("Unexpected users data format:", usersData);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch users:", error);
// //       } finally {
// //         setIsLoadingUsers(false);
// //       }
// //     };

// //     fetchLocations();
// //     fetchUsers();
// //   }, []);

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity mt-[23%]">
// //       <div className="w-full max-w-4xl rounded-xl bg-transparent p-6 text-white shadow-lg">
// //         <div className="flex justify-end">
// //           <button onClick={onClose} className="text-gray-300 hover:text-white">
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
// //           <select
// //             name="category"
// //             value={filters.category}
// //             onChange={handleChange}
// //             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
// //           >
// //             <option value="">Asset Category</option>
// //             <option value="Cars">Cars</option>
// //             <option value="Goods 1">Goods 1</option>
// //             <option value="Goods 2">Goods 2</option>
// //             <option value="Goods 3">Goods 3</option>
// //           </select>

// //           <select
// //             name="assetLocation"
// //             value={filters.assetLocation}
// //             onChange={handleChange}
// //             disabled={isLoadingLocations}
// //             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
// //           >
// //             <option value="">
// //               {isLoadingLocations ? "Loading locations..." : "Location"}
// //             </option>
// //             {Array.isArray(locations) && locations.length > 0
// //               ? locations.map((loc) => (
// //                   <option key={loc?._id || loc?.id} value={loc?._id || loc?.id}>
// //                     {loc?.name || loc?.assetLocation || "Unnamed Location"}
// //                   </option>
// //                 ))
// //               : !isLoadingLocations && (
// //                   <option value="" disabled>
// //                     No locations available
// //                   </option>
// //                 )}
// //           </select>

// //           <input
// //             type="text"
// //             name="model"
// //             value={filters.model}
// //             onChange={handleChange}
// //             placeholder="Model"
// //             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
// //           />

// //           {/* Date Range */}
// //           <div className="flex space-x-2">
// //             {/* From Date */}
// //             <div className="relative w-1/2">
// //               <input
// //                 ref={fromInputRef}
// //                 type="date"
// //                 name="from"
// //                 value={filters.from}
// //                 onChange={handleChange}
// //                 className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
// //               />
// //               <CalendarDays
// //                 className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
// //                 onClick={() => fromInputRef.current?.showPicker?.()}
// //               />
// //             </div>

// //             {/* To Date */}
// //             <div className="relative w-1/2">
// //               <input
// //                 ref={toInputRef}
// //                 type="date"
// //                 name="to"
// //                 value={filters.to}
// //                 onChange={handleChange}
// //                 className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
// //               />
// //               <CalendarDays
// //                 className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
// //                 onClick={() => toInputRef.current?.showPicker?.()}
// //               />
// //             </div>
// //           </div>

// //           <input
// //             type="text"
// //             name="origin"
// //             value={filters.origin}
// //             onChange={handleChange}
// //             placeholder="Origin"
// //             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
// //           />

// //           <select
// //             name="inspectedBy"
// //             value={filters.inspectedBy}
// //             onChange={handleChange}
// //             disabled={isLoadingUsers}
// //             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
// //           >
// //             <option value="">
// //               {isLoadingUsers ? "Loading users..." : "Select User"}
// //             </option>
// //             {Array.isArray(users) && users.length > 0
// //               ? users.map((user) => (
// //                   <option key={user._id} value={user._id}>
// //                     {user.userName || user.name || user.userName}
// //                   </option>
// //                 ))
// //               : !isLoadingUsers && (
// //                   <option value="" disabled>
// //                     No users available
// //                   </option>
// //                 )}
// //           </select>
// //         </div>

// //         {/* Buttons */}
// //         <div className="mt-6 flex justify-start gap-4">
// //           <button
// //             onClick={handleSearch}
// //             className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
// //           >
// //             <Search size={16} />
// //             Search
// //           </button>
// //           <button
// //             onClick={handleReset}
// //             className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
// //           >
// //             Reset Filters
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdvancedSearchModal;


// import { CalendarDays, Search, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { apiGetLocations, apiGetUsers, apiGetAllAssets } from "../servicess/tali";
// import { useRef } from "react";

// const AdvancedSearchModal = ({ onClose, searchTerm, setSearchTerm }) => {
//   const navigate = useNavigate();
//   const [isLoadingLocations, setIsLoadingLocations] = useState(false);

//   const [filters, setFilters] = useState({
//     search: searchTerm,
//     category: "",
//     assetLocation: "",
//     make: "",
//     model: "",
//     origin: "",
//     inspectedBy: "",
//     from: "",
//     to: "",
//   });

//   const [locations, setLocations] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  
//   // New state for dynamic dropdowns
//   const [makes, setMakes] = useState([]);
//   const [models, setModels] = useState([]);
//   const [origins, setOrigins] = useState([]);
//   const [isLoadingMakes, setIsLoadingMakes] = useState(false);
//   const [isLoadingModels, setIsLoadingModels] = useState(false);
//   const [isLoadingOrigins, setIsLoadingOrigins] = useState(false);

//   const fromInputRef = useRef();
//   const toInputRef = useRef();

//   // Function to fetch unique makes from assets
//   const fetchMakes = async () => {
//     setIsLoadingMakes(true);
//     try {
//       const response = await apiGetAllAssets();
//       const assets = response?.data?.assets || response?.data || [];
      
//       // Extract unique makes
//       const uniqueMakes = [...new Set(assets
//         .map(asset => asset.make)
//         .filter(make => make && make.trim() !== "")
//       )].sort();
      
//       setMakes(uniqueMakes);
//     } catch (error) {
//       console.error("Failed to fetch makes:", error);
//     } finally {
//       setIsLoadingMakes(false);
//     }
//   };

//   // Function to fetch models and origins based on selected make
//   const fetchModelsAndOrigins = async (selectedMake) => {
//     if (!selectedMake) {
//       setModels([]);
//       setOrigins([]);
//       return;
//     }

//     setIsLoadingModels(true);
//     setIsLoadingOrigins(true);
    
//     try {
//       // Fetch assets filtered by make
//       const response = await fetch(`https://backend-ps-tali.onrender.com/assets?make=${encodeURIComponent(selectedMake)}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       const assets = data?.assets || data?.data || [];
      
//       // Extract unique models for this make
//       const uniqueModels = [...new Set(assets
//         .map(asset => asset.model)
//         .filter(model => model && model.trim() !== "")
//       )].sort();
      
//       // Extract unique origins for this make
//       const uniqueOrigins = [...new Set(assets
//         .map(asset => asset.origin)
//         .filter(origin => origin && origin.trim() !== "")
//       )].sort();
      
//       setModels(uniqueModels);
//       setOrigins(uniqueOrigins);
      
//     } catch (error) {
//       console.error("Failed to fetch models and origins:", error);
//       setModels([]);
//       setOrigins([]);
//     } finally {
//       setIsLoadingModels(false);
//       setIsLoadingOrigins(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
    
//     if (name === "search") {
//       setSearchTerm(value); // Update parent's state
//     }
    
//     // If make is changed, fetch related models and origins
//     if (name === "make") {
//       // Reset model and origin when make changes
//       setFilters(prev => ({ 
//         ...prev, 
//         make: value, 
//         model: "", 
//         origin: "" 
//       }));
//       fetchModelsAndOrigins(value);
//     }
//   };

//   const handleSearch = () => {
//     const params = new URLSearchParams();

//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) params.append(key, value);
//     });

//     params.append("page", 1);
//     params.append("limit", 10);
//     params.append("sortBy", "createdAt");
//     params.append("sortOrder", "desc");

//     navigate(`/dashboard/assets?${params.toString()}`);
//     onClose();
//   };

//   const handleReset = () => {
//     setFilters({
//       search: "",
//       category: "",
//       assetLocation: "",
//       make: "",
//       model: "",
//       origin: "",
//       inspectedBy: "",
//       from: "",
//       to: "",
//     });
//     setModels([]);
//     setOrigins([]);
//   };

//   useEffect(() => {
//     setFilters((prev) => ({ ...prev, search: searchTerm }));
//   }, [searchTerm]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       setIsLoadingLocations(true);
//       try {
//         const response = await apiGetLocations();
//         console.log("Locations API Response:", response);

//         const locationsData =
//           response?.data?.data ||
//           response?.data ||
//           response?.locations ||
//           response;

//         if (Array.isArray(locationsData)) {
//           setLocations(locationsData);
//         } else {
//           console.error("Unexpected locations data format:", locationsData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch locations:", error);
//       } finally {
//         setIsLoadingLocations(false);
//       }
//     };

//     const fetchUsers = async () => {
//       setIsLoadingUsers(true);
//       try {
//         const response = await apiGetUsers();
//         console.log("Users API Response:", response);

//         const usersData = response?.data || response?.users || response;

//         if (Array.isArray(usersData)) {
//           setUsers(usersData);
//         } else {
//           console.error("Unexpected users data format:", usersData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       } finally {
//         setIsLoadingUsers(false);
//       }
//     };

//     fetchLocations();
//     fetchUsers();
//     fetchMakes(); // Fetch makes on component mount
//   }, []);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity mt-[23%]">
//       <div className="w-full max-w-4xl rounded-xl bg-transparent p-6 text-white shadow-lg">
//         <div className="flex justify-end">
//           <button onClick={onClose} className="text-gray-300 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//           <select
//             name="category"
//             value={filters.category}
//             onChange={handleChange}
//             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
//           >
//             <option value="">Asset Category</option>
//             <option value="Cars">Cars</option>
//             <option value="Goods 1">Goods 1</option>
//             <option value="Goods 2">Goods 2</option>
//             <option value="Goods 3">Goods 3</option>
//           </select>

//           <select
//             name="assetLocation"
//             value={filters.assetLocation}
//             onChange={handleChange}
//             disabled={isLoadingLocations}
//             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
//           >
//             <option value="">
//               {isLoadingLocations ? "Loading locations..." : "Location"}
//             </option>
//             {Array.isArray(locations) && locations.length > 0
//               ? locations.map((loc) => (
//                   <option key={loc?._id || loc?.id} value={loc?._id || loc?.id}>
//                     {loc?.name || loc?.assetLocation || "Unnamed Location"}
//                   </option>
//                 ))
//               : !isLoadingLocations && (
//                   <option value="" disabled>
//                     No locations available
//                   </option>
//                 )}
//           </select>

//           {/* Make Dropdown */}
//           <select
//             name="make"
//             value={filters.make}
//             onChange={handleChange}
//             disabled={isLoadingMakes}
//             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
//           >
//             <option value="">
//               {isLoadingMakes ? "Loading makes..." : "Select Make"}
//             </option>
//             {makes.map((make) => (
//               <option key={make} value={make}>
//                 {make}
//               </option>
//             ))}
//           </select>

//           {/* Model Dropdown - Dynamic based on selected make */}
//           <select
//             name="model"
//             value={filters.model}
//             onChange={handleChange}
//             disabled={isLoadingModels || !filters.make}
//             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
//           >
//             <option value="">
//               {isLoadingModels 
//                 ? "Loading models..." 
//                 : !filters.make 
//                 ? "Select Make First" 
//                 : "Select Model"}
//             </option>
//             {models.map((model) => (
//               <option key={model} value={model}>
//                 {model}
//               </option>
//             ))}
//           </select>

//           {/* Origin Dropdown - Dynamic based on selected make */}
//           <select
//             name="origin"
//             value={filters.origin}
//             onChange={handleChange}
//             disabled={isLoadingOrigins || !filters.make}
//             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
//           >
//             <option value="">
//               {isLoadingOrigins 
//                 ? "Loading origins..." 
//                 : !filters.make 
//                 ? "Select Make First" 
//                 : "Select Origin"}
//             </option>
//             {origins.map((origin) => (
//               <option key={origin} value={origin}>
//                 {origin}
//               </option>
//             ))}
//           </select>

//           {/* Date Range */}
//           <div className="flex space-x-2">
//             {/* From Date */}
//             <div className="relative w-1/2">
//               <input
//                 ref={fromInputRef}
//                 type="date"
//                 name="from"
//                 value={filters.from}
//                 onChange={handleChange}
//                 className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
//               />
//               <CalendarDays
//                 className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
//                 onClick={() => fromInputRef.current?.showPicker?.()}
//               />
//             </div>

//             {/* To Date */}
//             <div className="relative w-1/2">
//               <input
//                 ref={toInputRef}
//                 type="date"
//                 name="to"
//                 value={filters.to}
//                 onChange={handleChange}
//                 className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
//               />
//               <CalendarDays
//                 className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
//                 onClick={() => toInputRef.current?.showPicker?.()}
//               />
//             </div>
//           </div>

//           <select
//             name="inspectedBy"
//             value={filters.inspectedBy}
//             onChange={handleChange}
//             disabled={isLoadingUsers}
//             className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
//           >
//             <option value="">
//               {isLoadingUsers ? "Loading users..." : "Select User"}
//             </option>
//             {Array.isArray(users) && users.length > 0
//               ? users.map((user) => (
//                   <option key={user._id} value={user._id}>
//                     {user.userName || user.name || user.userName}
//                   </option>
//                 ))
//               : !isLoadingUsers && (
//                   <option value="" disabled>
//                     No users available
//                   </option>
//                 )}
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex justify-start gap-4">
//           <button
//             onClick={handleSearch}
//             className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
//           >
//             <Search size={16} />
//             Search
//           </button>
//           <button
//             onClick={handleReset}
//             className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdvancedSearchModal;


import { CalendarDays, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { apiGetLocations, apiGetUsers } from "../servicess/tali";
import { useRef } from "react";

const AdvancedSearchModal = ({ onClose, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isLoadingMakes, setIsLoadingMakes] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isLoadingOrigins, setIsLoadingOrigins] = useState(false);

  const [filters, setFilters] = useState({
    search: searchTerm,
    category: "",
    assetLocation: "",
    make: "",
    model: "",
    origin: "",
    inspectedBy: "",
    from: "",
    to: "",
  });

  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const fromInputRef = useRef();
  const toInputRef = useRef();

  // Fetch unique makes from API
  const fetchMakes = async () => {
    setIsLoadingMakes(true);
    try {
      const response = await fetch('https://backend-ps-tali.onrender.com/assets');
      const data = await response.json();
      
      let assets = [];
      if (data.assets && Array.isArray(data.assets)) {
        assets = data.assets;
      } else if (Array.isArray(data)) {
        assets = data;
      }

      // Extract unique makes
      const uniqueMakes = [...new Set(
        assets
          .map(asset => asset.make)
          .filter(make => make && make.trim() !== '')
      )].sort();

      setMakes(uniqueMakes);
    } catch (error) {
      console.error('Failed to fetch makes:', error);
    } finally {
      setIsLoadingMakes(false);
    }
  };

  // Fetch models based on selected make
  const fetchModelsByMake = async (selectedMake) => {
    if (!selectedMake) {
      setModels([]);
      return;
    }

    setIsLoadingModels(true);
    try {
      const response = await fetch(`https://backend-ps-tali.onrender.com/assets?make=${encodeURIComponent(selectedMake)}`);
      const data = await response.json();
      
      let assets = [];
      if (data.assets && Array.isArray(data.assets)) {
        assets = data.assets;
      } else if (Array.isArray(data)) {
        assets = data;
      }

      // Extract unique models for the selected make
      const uniqueModels = [...new Set(
        assets
          .filter(asset => asset.make === selectedMake)
          .map(asset => asset.model)
          .filter(model => model && model.trim() !== '')
      )].sort();

      setModels(uniqueModels);
    } catch (error) {
      console.error('Failed to fetch models:', error);
      setModels([]);
    } finally {
      setIsLoadingModels(false);
    }
  };

  // Fetch unique origins from API
  const fetchOrigins = async () => {
    setIsLoadingOrigins(true);
    try {
      const response = await fetch('https://backend-ps-tali.onrender.com/assets');
      const data = await response.json();
      
      let assets = [];
      if (data.assets && Array.isArray(data.assets)) {
        assets = data.assets;
      } else if (Array.isArray(data)) {
        assets = data;
      }

      // Extract unique origins (assuming you have an origin field, or we can use make as origin for cars)
      // For cars, origin could be derived from make (e.g., Toyota = Japan, BMW = Germany, etc.)
      const makeToOriginMap = {
        'Toyota': 'Japan',
        'Honda': 'Japan',
        'Nissan': 'Japan',
        'Mazda': 'Japan',
        'Subaru': 'Japan',
        'Mitsubishi': 'Japan',
        'BMW': 'Germany',
        'Mercedes-Benz': 'Germany',
        'Audi': 'Germany',
        'Volkswagen': 'Germany',
        'Porsche': 'Germany',
        'Ford': 'USA',
        'Chevrolet': 'USA',
        'Cadillac': 'USA',
        'Buick': 'USA',
        'GMC': 'USA',
        'Chrysler': 'USA',
        'Dodge': 'USA',
        'Jeep': 'USA',
        'Hyundai': 'South Korea',
        'Kia': 'South Korea',
        // Add more mappings as needed
      };

      let uniqueOrigins = [];

      // If assets have an 'origin' field, use that
      if (assets.some(asset => asset.origin)) {
        uniqueOrigins = [...new Set(
          assets
            .map(asset => asset.origin)
            .filter(origin => origin && origin.trim() !== '')
        )];
      } else {
        // Otherwise, derive origins from makes
        const origins = assets
          .map(asset => makeToOriginMap[asset.make])
          .filter(origin => origin);
        uniqueOrigins = [...new Set(origins)];
      }

      setOrigins(uniqueOrigins.sort());
    } catch (error) {
      console.error('Failed to fetch origins:', error);
    } finally {
      setIsLoadingOrigins(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    
    if (name === "search") {
      setSearchTerm(value);
    }

    // When make changes, fetch related models and reset model selection
    if (name === "make") {
      setFilters(prev => ({ ...prev, model: "" })); // Reset model when make changes
      fetchModelsByMake(value);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    params.append("page", 1);
    params.append("limit", 10);
    params.append("sortBy", "createdAt");
    params.append("sortOrder", "desc");

    navigate(`/dashboard/assets?${params.toString()}`);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      assetLocation: "",
      make: "",
      model: "",
      origin: "",
      inspectedBy: "",
      from: "",
      to: "",
    });
    setModels([]); // Clear models when resetting
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  }, [searchTerm]);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await apiGetLocations();
        console.log("Locations API Response:", response);

        const locationsData =
          response?.data?.data ||
          response?.data ||
          response?.locations ||
          response;

        if (Array.isArray(locationsData)) {
          setLocations(locationsData);
        } else {
          console.error("Unexpected locations data format:", locationsData);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const response = await apiGetUsers();
        console.log("Users API Response:", response);

        const usersData = response?.data || response?.users || response;

        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          console.error("Unexpected users data format:", usersData);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchLocations();
    fetchUsers();
    fetchMakes();
    fetchOrigins();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity mt-[23%]">
      <div className="w-full max-w-4xl rounded-xl bg-transparent p-6 text-white shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {/* Category Select */}
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">Asset Category</option>
            <option value="Cars">Cars</option>
            <option value="Goods 1">Goods 1</option>
            <option value="Goods 2">Goods 2</option>
            <option value="Goods 3">Goods 3</option>
          </select>

          {/* Location Select */}
          <select
            name="assetLocation"
            value={filters.assetLocation}
            onChange={handleChange}
            disabled={isLoadingLocations}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">
              {isLoadingLocations ? "Loading locations..." : "Location"}
            </option>
            {Array.isArray(locations) && locations.length > 0
              ? locations.map((loc) => (
                  <option key={loc?._id || loc?.id} value={loc?._id || loc?.id}>
                    {loc?.name || loc?.assetLocation || "Unnamed Location"}
                  </option>
                ))
              : !isLoadingLocations && (
                  <option value="" disabled>
                    No locations available
                  </option>
                )}
          </select>

          {/* Make Select */}
          <select
            name="make"
            value={filters.make}
            onChange={handleChange}
            disabled={isLoadingMakes}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">
              {isLoadingMakes ? "Loading makes..." : "Select Make"}
            </option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>

          {/* Model Select - Dependent on Make */}
          <select
            name="model"
            value={filters.model}
            onChange={handleChange}
            disabled={!filters.make || isLoadingModels}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">
              {isLoadingModels 
                ? "Loading models..." 
                : !filters.make 
                ? "Select Make First" 
                : "Select Model"}
            </option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>

          {/* Origin Select */}
          <select
            name="origin"
            value={filters.origin}
            onChange={handleChange}
            disabled={isLoadingOrigins}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">
              {isLoadingOrigins ? "Loading origins..." : "Select Origin"}
            </option>
            {origins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>

          {/* Date Range */}
          <div className="flex space-x-2">
            {/* From Date */}
            <div className="relative w-1/2">
              <input
                ref={fromInputRef}
                type="date"
                name="from"
                value={filters.from}
                onChange={handleChange}
                className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
              />
              <CalendarDays
                className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
                onClick={() => fromInputRef.current?.showPicker?.()}
              />
            </div>

            {/* To Date */}
            <div className="relative w-1/2">
              <input
                ref={toInputRef}
                type="date"
                name="to"
                value={filters.to}
                onChange={handleChange}
                className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
              />
              <CalendarDays
                className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
                onClick={() => toInputRef.current?.showPicker?.()}
              />
            </div>
          </div>

          {/* Inspected By Select */}
          <select
            name="inspectedBy"
            value={filters.inspectedBy}
            onChange={handleChange}
            disabled={isLoadingUsers}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">
              {isLoadingUsers ? "Loading users..." : "Select User"}
            </option>
            {Array.isArray(users) && users.length > 0
              ? users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.userName || user.name || user.userName}
                  </option>
                ))
              : !isLoadingUsers && (
                  <option value="" disabled>
                    No users available
                  </option>
                )}
          </select>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-start gap-4">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            <Search size={16} />
            Search
          </button>
          <button
            onClick={handleReset}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;