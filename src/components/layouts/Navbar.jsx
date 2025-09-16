import React from 'react'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi'
import SideMenu from './SideMenu';
import { useState } from 'react';

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
      <button className='block lg:hidden text-black'
      onClick={()=>{
        setOpenSideMenu(!openSideMenu);
      }}
      >
        {openSideMenu ? (
            <HiOutlineX className='text-2xl'/>
        ) : (
            <HiOutlineMenu className='text-2xl'/>
        )}
      </button>
        <div className='flex'>
          <img src="https://res.cloudinary.com/dzpcirnqq/image/upload/v1757760410/ChatGPT_Image_Sep_13_2025_04_15_18_PM_wt6pyi.png" className='h-10 w-10 rounded-full'/>
          <h2 className='text-lg font-medium text-black ml-2 mt-2'>Task Manager</h2>
        </div>
        

        {openSideMenu && (
            <div className='fixed top-[61px] -ml-4 bg-white'>
                <SideMenu activeMenu={activeMenu}/>
            </div>
        )}

    </div>
  )
}

export default Navbar
