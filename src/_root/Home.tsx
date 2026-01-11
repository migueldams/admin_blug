import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import Article from './components/Article';
import Oeuvre from './components/Oeuvre';
import Blog from './components/Blog';
import Market from './components/Market';
import Formation from './components/Formation';

function Home() {
  return (
    <div className='w-full lg:w-4/5 flex flex-col gap-20'>
        <Article />
        {/* <Oeuvre /> */}
        <Blog />
        <Market />
        <Formation />
    </div>
  )
}

export default Home