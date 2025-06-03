import React from 'react'

const ViewAsset = () => {
  return (
    <div>
      <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
        <div className='flex flex-row justify-between '>
        <p className='font-semibold mb-4'>Asset: Toyota Camry</p>
        <div>
          <button className='border-2 px-2 py-2'>Edit</button>
          <button className='border-2 px-2 py-2'>Download</button>
        </div>
      </div>
      <div>
        <div className='flex fex-row gap-5'>
          <p>Overview</p>
          <p>History</p>
        </div>
        <p className='border-b-2'></p>
      </div>
      <div className='flex flex-row'>
        <div>
          <div>
            <p>Primary Details</p>
            <div className='flex flex-row gap-10'>
              <p>Asset Name</p>
              <p>Toyota Camry</p>
            </div>
            <div className='flex flex-row gap-10'>
              <p>Asset ID</p>
              <p>Toyota Camry</p>
            </div>
            <div className='flex flex-row gap-10'>
              <p>Asset Category</p>
              <p>Toyota Camry</p>
            </div>
            <div className='flex flex-row gap-10'>
              <p>Asset Location</p>
              <p>Toyota Camry</p>
            </div>
          </div>
          <div>
            <p>User Details</p>
            <div className='flex flex-row gap-10'>
              <p>Asset Location</p>
              <p>Toyota Camry</p>
            </div>
            <div className='flex flex-row gap-10'>
              <p>Asset Location</p>
              <p>Toyota Camry</p>
            </div>
          </div>
        </div>
        <div>
          <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center w-56 h-56">
            <input
              type="file"
              name="image"
              id="imageUpload"
              className="opacity-0 absolute w-full h-full cursor-pointer"
            />
          </div>
          <p>Available: 20</p>
          <p>Unavailable</p>
        </div>
      </div>
      <div>
        <p>Primary Details</p>
        <div className='flex flex-row border-2 justify-between py-2'>
          <p>Store Name</p>
          <p>Stock in hand</p>
        </div>
        <div className='flex flex-row border-2 justify-between border-b'>
          <p>Tema</p>
          <p>10</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ViewAsset;