import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function Oeuvre() {
  
  return (
    <div className='flex flex-col gap-8'>
      <h2 className='font-semibold text-2xl'>Oeuvre</h2>
      <div className='w-full bg-gray-800 min-h-100 rounded-md p-4'>
        <div className='w-full min-h-80 p-4 gap-4'>
          <div className='w-full flex h-20'>
            <div className='w-4/5 h-full flex flex-col gap-2 bg-gray-900 p-2 rounded-md'>
              <p>1er Oeuvre</p>
              <p>contenue</p>
            </div>
            <div className='w-1/5 flex flex-col items-center  gap-4'>
              <button className='bg-gray-800 text-white'><MdDeleteOutline size={10} /></button>
              <button className='bg-transparent text-white'><MdOutlineModeEdit size={10} /></button>
            </div>
          </div>
        </div>
        <div className='w-full h-10 flex justify-end'>
          <button className='bg-gray-600 p-2 rounded-sm flex items-center gap-2'>Publier <IoMdAdd /></button>
        </div>
      </div>
    </div>
  )
}

export default Oeuvre