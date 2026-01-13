

import { Link ,useLocation } from 'react-router-dom'
const Bottombar = () => {
  const location = useLocation()
  const bottombarLinks = [
    {
      label: 'Home',
      route: '/layout/home',
      imgURL: '@/assets/icons/home.svg'
    },
  ]

  return (
    <div className='bg-gray-900 h-[7%] flex justify-around text-white items-center md:hidden'>
        {bottombarLinks.map((link,index) =>(
            <Link key={index} to={link.route} className={` ${location.pathname === link.route && 'bg-indigo-700 rounded-[10px] '} flex flex-col justify-center p-2 transition`}>
            <img src={link.imgURL} alt={link.label} className={`h-5 group-hover:invert-white ${location.pathname === link.route && 'invert-white'} `}  />
            <p className='text-white font-semibold text-sm'>{link.label}</p>
            </Link>   
        ))
        }
    </div>
  )
}

export default Bottombar