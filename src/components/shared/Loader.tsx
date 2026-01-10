import React from 'react'
import loaders from '@/assets/icons/loader.svg'

function Loader() {
  return (
    <div className='flex'>
        <img className='w-[24px] mr-2' src={loaders} alt="" />
    </div>
  )
}

export default Loader