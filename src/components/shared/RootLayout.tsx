import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
function RootLayout() {

  return (
    <div className='md:flex h-screen w-screen  items-center bg-[#000000]'>
      <Topbar />
      <LeftSidebar />
      <div className='w-full flex  h-[85%]  overflow-y-auto md:h-screen '>
        <Outlet />
      </div>
      <Bottombar />
    </div>

  )
}

export default RootLayout