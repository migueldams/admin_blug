
import { Link } from 'react-router-dom'
import imgLogout from "@/assets/icons/logout.svg"
import imgprofil from '@/assets/icons/profile-placeholder.svg'
const Topbar = () => {
    // const { mutateAsync: signOutAccount, isSuccess } = useSignOutAccount()
    // const navigate = useNavigate()
    // const { user, setIsAuthenticated, setUser } = useUserContext()

    // useEffect(() => {
    //     console.log(isSuccess)
    //     if (isSuccess) {
    //         setIsAuthenticated(false)
    //         localStorage.removeItem("user"); // 2️⃣ Efface le cache local
    //         setUser({
    //             id: "",
    //             name: "",
    //             username: "",
    //             email: "",
    //             imageUrl: "",
    //             bio: ""
    //         });
    //         navigate('/sign-in')
    //     }
    // }, [isSuccess])


    return (
        <div className='md:hidden w-full h-[7%] flex bg-gray-900'>
            <div className='flex justify-between py-4 p-5 w-full'>
                <Link to="/" className='flex gap-3 items-center w-3/3'>
                    <p>Hevaen writing</p>
                </Link>
                <button  className='shad-buttin_ghost' >
                    <img src={imgLogout} alt="logout" />
                </button>
                <Link to={`/profile`} className='flex justify-center' >
                    <img src={imgprofil} alt="photoProfil"
                        width={40}
                        height={325} className='rounded-full'/>
                </Link>
            </div>

        </div>
    )
}

export default Topbar