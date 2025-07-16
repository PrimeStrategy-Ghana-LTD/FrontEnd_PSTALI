// import React, { useState } from 'react';
// import { IoDownloadOutline, IoCloudUploadOutline, IoArrowBackOutline } from 'react-icons/io5';
// import { apiImportAssetSheet } from '../servicess/tali';
// import { useNavigate } from 'react-router-dom';

// const ImportAssetsPage = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [importResult, setImportResult] = useState(null);
//   const [dragOver, setDragOver] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       validateAndSetFile(selectedFile);
//     }
//   };

//   const validateAndSetFile = (selectedFile) => {
//     const allowedTypes = [
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       'application/vnd.ms-excel',
//       'text/csv'
//     ];
    
//     if (!allowedTypes.includes(selectedFile.type)) {
//       setError('Please select a valid Excel file (.xlsx, .xls) or CSV file');
//       return;
//     }

//     if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
//       setError('File size should not exceed 10MB');
//       return;
//     }

//     setFile(selectedFile);
//     setError('');
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
    
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) {
//       validateAndSetFile(droppedFile);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       setError('Please select a file to import');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await apiImportAssetSheet(formData);
      
//       setImportResult({
//         message: response.data.message,
//         successCount: response.data.successCount,
//         failedCount: response.data.failedCount,
//         errors: response.data.errors || []
//       });
//     } catch (error) {
//       console.error('Import failed:', error);
//       setError(error.response?.data?.message || 'Failed to import assets');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownloadTemplate = () => {
//     // Create a sample Excel template
//     const templateData = [
//       ['Asset Name', 'Asset ID/VIN', 'Make', 'Model', 'Year', 'Mileage', 'Exterior Colour', 'Variant', 'Body Type', 'Fuel Type', 'Drivetrain', 'Door Count', 'Seating Capacity', 'Condition', 'Asset Location', 'Justification'],
//       ['Toyota Camry', 'VIN123456789', 'Toyota', 'Camry', '2023', '15000', 'Silver', 'LE', 'Sedan', 'Gasoline', 'FWD', '4', '5', 'Good', 'Main Office', 'Fleet vehicle for operations'],
//       ['Honda Civic', 'VIN987654321', 'Honda', 'Civic', '2022', '25000', 'Blue', 'Sport', 'Sedan', 'Gasoline', 'FWD', '4', '5', 'Excellent', 'Branch Office', 'Company car for executives']
//     ];

//     const csvContent = templateData.map(row => 
//       row.map(cell => `"${cell}"`).join(',')
//     ).join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'asset_import_template.csv';
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   };

//   const resetForm = () => {
//     setFile(null);
//     setError('');
//     setImportResult(null);
//     setLoading(false);
//   };

//   // Helper function to render error messages properly
//   const renderErrorMessage = (error) => {
//     if (typeof error === 'string') {
//       return error;
//     }
    
//     if (typeof error === 'object' && error !== null) {
//       if (error.message) {
//         return error.message;
//       }
      
//       if (error.row && error.assetId && error.message) {
//         return `Row ${error.row}: ${error.message} (Asset ID: ${error.assetId})`;
//       }
      
//       if (error.row && error.message) {
//         return `Row ${error.row}: ${error.message}`;
//       }
      
//       return JSON.stringify(error);
//     }
    
//     return 'Unknown error';
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-4xl mx-auto">
//       {/* Page Header */}
//       <div className="flex items-center justify-between mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
//         >
//           <IoArrowBackOutline size={20} />
//           <span>Back</span>
//         </button>
//         <h1 className="text-2xl font-bold text-gray-900">Import Assets</h1>
//         <div className="w-8"></div> {/* Spacer for alignment */}
//       </div>

//       <div className="space-y-6">
//         {!importResult ? (
//           <div>
//             {/* Template Download Section */}
//             <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <h3 className="font-medium text-blue-900 mb-2">Download Template</h3>
//               <p className="text-sm text-blue-700 mb-3">
//                 Download our Excel template to ensure your data is formatted correctly
//               </p>
//               <button
//                 type="button"
//                 onClick={handleDownloadTemplate}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//               >
//                 <IoDownloadOutline />
//                 Download Template
//               </button>
//             </div>

//             {/* File Upload Section */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload Excel File
//               </label>
//               <div
//                 className={`border-2 border-dashed rounded-lg p-6 text-center ${
//                   dragOver
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-300 hover:border-gray-400'
//                 }`}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//               >
//                 <input
//                   type="file"
//                   accept=".xlsx,.xls,.csv"
//                   onChange={handleFileChange}
//                   className="hidden"
//                   id="excel-file-input"
//                 />
//                 <label
//                   htmlFor="excel-file-input"
//                   className="cursor-pointer flex flex-col items-center"
//                 >
//                   <IoCloudUploadOutline className="text-4xl text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-600">
//                     Click to upload or drag and drop your Excel file here
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Supports .xlsx, .xls, and .csv files (Max 10MB)
//                   </p>
//                 </label>
//               </div>
              
//               {file && (
//                 <div className="mt-3 p-3 bg-gray-50 rounded-md">
//                   <p className="text-sm text-gray-700">
//                     <strong>Selected file:</strong> {file.name}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Size: {(file.size / 1024 / 1024).toFixed(2)} MB
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Instructions */}
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-medium text-gray-900 mb-2">Important Notes:</h3>
//               <ul className="text-sm text-gray-700 space-y-1">
//                 <li>• Ensure your Excel file follows the template format</li>
//                 <li>• Asset Location must match existing locations in the system</li>
//                 <li>• All required fields must be filled</li>
//                 <li>• Asset ID/VIN must be unique</li>
//                 <li>• Year should be between 1990 and current year</li>
//               </ul>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//                 disabled={loading}
//               >
//                 Reset
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="px-6 py-2 bg-[#051b34] text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 disabled={loading || !file}
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Importing...
//                   </>
//                 ) : (
//                   'Import Assets'
//                 )}
//               </button>
//             </div>
//           </div>
//         ) : (
//           /* Import Results */
//           <div className="space-y-4">
//             <div className="text-center">
//               <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
//                 importResult.failedCount === 0 ? 'bg-green-100' : 'bg-yellow-100'
//               }`}>
//                 {importResult.failedCount === 0 ? (
//                   <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 ) : (
//                   <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                   </svg>
//                 )}
//               </div>
//               <h3 className="text-lg font-medium text-gray-900">Import Complete</h3>
//               <p className="text-sm text-gray-600">{importResult.message}</p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="p-4 bg-green-50 rounded-lg text-center">
//                 <p className="text-2xl font-bold text-green-600">{importResult.successCount}</p>
//                 <p className="text-sm text-green-700">Successfully Imported</p>
//               </div>
//               <div className="p-4 bg-red-50 rounded-lg text-center">
//                 <p className="text-2xl font-bold text-red-600">{importResult.failedCount}</p>
//                 <p className="text-sm text-red-700">Failed to Import</p>
//               </div>
//             </div>

//             {importResult.errors && importResult.errors.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="font-medium text-gray-900 mb-2">Import Errors:</h4>
//                 <div className="bg-red-50 border border-red-200 rounded-md p-3 max-h-40 overflow-y-auto">
//                   <ul className="text-sm text-red-700 space-y-1">
//                     {importResult.errors.map((error, index) => (
//                       <li key={index}>• {renderErrorMessage(error)}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 onClick={resetForm}
//                 className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//               >
//                 Import More
//               </button>
//               <button
//                 onClick={() => navigate('/dashboard/assets')}
//                 className="px-4 py-2 bg-[#051b34] text-white rounded-md hover:bg-blue-700"
//               >
//                 Back to Assets
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImportAssetsPage;


import React, { useState } from 'react';
import { IoDownloadOutline, IoCloudUploadOutline, IoArrowBackOutline } from 'react-icons/io5';
import { apiImportAssetSheet } from '../servicess/tali';
import { useNavigate } from 'react-router-dom';

const ImportAssetsPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [importResult, setImportResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please select a valid Excel file (.xlsx, .xls) or CSV file');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size should not exceed 10MB');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to import');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiImportAssetSheet(formData);
      
      setImportResult({
        message: response.data.message,
        successCount: response.data.successCount,
        failedCount: response.data.failedCount,
        errors: response.data.errors || []
      });
    } catch (error) {
      console.error('Import failed:', error);
      setError(error.response?.data?.message || 'Failed to import assets');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Create a sample Excel template with the specified columns
    const templateData = [
      ['Asset Name', 'Asset ID', 'Mileage', 'Fuel Type', 'Exterior Colour', 'Drivetrain', 'Asset Location', 'Justification', 'Make', 'Model', 'Year', 'Body Type', 'Variant', 'Category', 'Origin', 'Condition', 'Door Count', 'Seating Capacity', 'Image URL'],
      ['Toyota Camry', 'VIN123456789', '15000', 'Gasoline', 'Silver', 'FWD', 'Main Office', 'Fleet vehicle for operations', 'Toyota', 'Camry', '2023', 'Sedan', 'LE', 'Vehicle', 'Purchase', 'Good', '4', '5', 'https://example.com/camry-front.jpg'],
      ['Honda Civic', 'VIN987654321', '25000', 'Gasoline', 'Blue', 'FWD', 'Branch Office', 'Company car for executives', 'Honda', 'Civic', '2022', 'Sedan', 'Sport', 'Vehicle', 'Lease', 'Excellent', '4', '5', 'https://example.com/civic-main.jpg']
    ];

    const csvContent = templateData.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asset_import_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const resetForm = () => {
    setFile(null);
    setError('');
    setImportResult(null);
    setLoading(false);
    
    // Clear the file input value to allow selecting the same file again
    const fileInput = document.getElementById('excel-file-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Helper function to render error messages properly
  const renderErrorMessage = (error) => {
    if (typeof error === 'string') {
      return error;
    }
    
    if (typeof error === 'object' && error !== null) {
      if (error.message) {
        return error.message;
      }
      
      if (error.row && error.assetId && error.message) {
        return `Row ${error.row}: ${error.message} (Asset ID: ${error.assetId})`;
      }
      
      if (error.row && error.message) {
        return `Row ${error.row}: ${error.message}`;
      }
      
      return JSON.stringify(error);
    }
    
    return 'Unknown error';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <IoArrowBackOutline size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Import Assets</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      <div className="space-y-6">
        {!importResult ? (
          <div>
            {/* Template Download Section */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Download Template</h3>
              <p className="text-sm text-blue-700 mb-3">
                Download our Excel template to ensure your data is formatted correctly. The template includes support for asset images.
              </p>
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                <IoDownloadOutline />
                Download Template
              </button>
            </div>

            {/* File Upload Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Excel File
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragOver
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="excel-file-input"
                />
                <label
                  htmlFor="excel-file-input"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <IoCloudUploadOutline className="text-4xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop your Excel file here
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports .xlsx, .xls, and .csv files (Max 10MB)
                  </p>
                </label>
              </div>
              
              {file && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Selected file:</strong> {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Instructions */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Important Notes:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Ensure your Excel file follows the template format</li>
                <li>• Asset Location must match existing locations in the system</li>
                <li>• All required fields must be filled</li>
                <li>• Asset ID must be unique</li>
                <li>• Year should be between 1990 and current year</li>
                <li>• <strong>Images can be embedded directly in Excel or use image URLs</strong></li>
                <li>• For image URLs, ensure they are publicly accessible and use HTTPS or HTTP</li>
                <li>• Supported image formats: JPG, PNG, GIF, WebP</li>
                <li>• Images will be automatically resized and optimized during import</li>
              </ul>
            </div>

            {/* Image Support Information */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-900 mb-2">📸 Image Support</h3>
              <div className="text-sm text-green-700 space-y-2">
                <p><strong>Two ways to add images:</strong></p>
                <div className="ml-4 space-y-1">
                  <p>1. <strong>Direct embedding:</strong> Copy and paste images directly into Excel cells</p>
                  <p>2. <strong>Image URLs:</strong> Ensure they are publicly accessible and are absolute URLs with HTTPS or HTTP.</p>
                </div>
                <p><strong>URL Format:</strong> https://example.com/image.jpg or  http://example.com/image.jpg</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={loading}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#051b34] text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={loading || !file}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Importing...
                  </>
                ) : (
                  'Import Assets'
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Import Results */
          <div className="space-y-4">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                importResult.failedCount === 0 ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {importResult.failedCount === 0 ? (
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900">Import Complete</h3>
              <p className="text-sm text-gray-600">{importResult.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{importResult.successCount}</p>
                <p className="text-sm text-green-700">Successfully Imported</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">{importResult.failedCount}</p>
                <p className="text-sm text-red-700">Failed to Import</p>
              </div>
            </div>

            {importResult.errors && importResult.errors.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Import Errors:</h4>
                <div className="bg-red-50 border border-red-200 rounded-md p-3 max-h-40 overflow-y-auto">
                  <ul className="text-sm text-red-700 space-y-1">
                    {importResult.errors.map((error, index) => (
                      <li key={index}>• {renderErrorMessage(error)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Import More
              </button>
              <button
                onClick={() => navigate('/dashboard/assets')}
                className="px-4 py-2 bg-[#051b34] text-white rounded-md hover:bg-blue-700"
              >
                Back to Assets
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportAssetsPage;