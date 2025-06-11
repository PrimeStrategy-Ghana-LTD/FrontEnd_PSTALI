import React from 'react'
import Sidebar1 from '../components/Sidebar1';
import Searchbar from '../components/Searchbar';

const AllUsers = () => {
    return (
        <div className='flex'>
            <Sidebar1 />
            <div>
                <Searchbar />
                <div className='bg-[#f0f1f3] min-h-[90%] space-y-5 py-6 px-4'>

                </div>
            </div>
        </div>
    )
}

export default AllUsers;