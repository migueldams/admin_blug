import  { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import imgLogout from "@/assets/icons/logout.svg"
import imgprofil from '@/assets/icons/profile-placeholder.svg'
import { useSignOutAccount } from '@/lib/react_query/querieAndMutation'
import logohome from '@/assets/icons/home.svg'
import setting from '@/assets/icons/bookmark.svg'
import { account } from '@/lib/appwrite/config'


const LeftSidebar = () => {
    const location = useLocation()
    const [user, setUser] = useState<any>(null);
    const { mutateAsync: signOutAccount } = useSignOutAccount()
    const navigate = useNavigate()
    const sidebarLinks = [
        {
            label: 'Home',
            route: '/layout/home',
            imgURL: logohome
        },
        {
            label: 'Settings',
            route: '/layout/blog',
            imgURL: setting
        },
    ]

    useEffect(() => {
        const checkSession = async () => {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
            } catch {
                setUser(null);
            }
        };

        checkSession();
    }, []);




    return (
        <nav className='hidden md:flex h-screen w-1/5 pl-2 pr-2 bg-gray-950 overflow-hidden lg:w-1/6 '>
            <div className='flex flex-col gap-10 w-full'>
                <Link to="/" className='flex h-20 items-center w-3/3'>
                    <p className='text-white text-2xl font-bold'>Hevaen writing</p>
                </Link>
                <Link to={`/profile`} className='flex space-x-1 w-full' >
                    <img src={imgprofil} alt="photoProfil" className='rounded-full w-10 h-10' />
                    <div className='flex flex-col'>
                        <p className='text-gray-200 font-semibold'>
                            {user?.name}
                        </p>
                        <p className='text-sm text-gray-300 text-light-3'>
                            @{user?.email}
                        </p>
                    </div>
                </Link>
                <ul className='flex flex-col gap-3 h-170 transition'>
                    {sidebarLinks.map((link, index) => {
                        return (
                            <Link key={index} to={link.route} className={`flex gap-4 items-center p-4 ${location.pathname === link.route && 'bg-indigo-700'} transition hover:bg-indigo-700 rounded-[8px]`}>
                                <li key={link.label} className={`text-white flex  font-semibol gap-2`}>
                                    <img src={link.imgURL} alt={link.label} className='ml-1 group-hover:invert-white' />
                                    {link.label}
                                </li>
                            </Link>
                        )

                    })}
                </ul>
                <button onClick={() => {
                    signOutAccount();
                    navigate('/');
                }} className='flex text-white text-xl' >
                    <img src={imgLogout} alt="logout" />
                    <p>LogOut</p>
                </button>
            </div>
        </nav>
    )
}

export default LeftSidebar