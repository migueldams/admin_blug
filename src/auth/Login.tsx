
import { FaGoogle } from "react-icons/fa";
// import { GoogleLogin } from '@react-oauth/google';
// import { googleLogout } from '@react-oauth/google';
// import {jwtDecode} from "jwt-decode";
import { useSignInWithGoogle } from '@/lib/react_query/querieAndMutation';

function Login() {
    const { mutateAsync: signInWithGoogle } = useSignInWithGoogle()

    async function handleGoogleLogin() {
        try {
             await signInWithGoogle();
            
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    }

    return (
        <div className='w-screen justify-center items-center text-white bg-black h-screen flex'>
            <div className='w-3/5 justify-center items-center flex flex-col gap-10 font-semibold'>
                <div>
                    <h1>Login Admin</h1>
                </div>
                <div className='flex flex-col items-center w-full text-black gap-4'>
                    {/* <GoogleLogin
                        width={100}
                        onSuccess={credentialResponse => {
                            var Response = jwtDecode(credentialResponse.credential!);
                            console.log(Response);
                            navigate('/layout');
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />; */}
                    <button onClick={()=>handleGoogleLogin()} className='flex justify-center gap-5 items-center bg-white'>connexion via google <FaGoogle /></button>
                </div>
            </div>
        </div>
    )
}

export default Login