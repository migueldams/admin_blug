import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import { account } from '@/lib/appwrite/config'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'


function Layout() {
  


  return (
     <div className='md:flex h-screen w-screen  items-center justify-center bg-[#000000]'>
      <Topbar />
      <LeftSidebar />
      <div className='w-full justify-center p-10 text-white flex flex-1 h-[85%] overflow-y-auto md:h-screen '>
        <Outlet />
      </div>
      <Bottombar />
    </div>
  )
}

export default Layout