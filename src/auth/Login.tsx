import React from 'react'
import { FaGoogle, FaPhoneAlt } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useSignInWithGoogle } from '@/lib/react_query/querieAndMutation';

function Login() {
    const navigate = useNavigate()
    const { mutateAsync: signInWithGoogle, isPending: isSigningIn } = useSignInWithGoogle()

    async function handleGoogleLogin() {
        try {
            const response = await signInWithGoogle();
            
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
                <div className='flex flex-col w-full gap-8'>
                    <input type="text" placeholder='Username' className='bg-gray-600 p-4 h-15 rounded-sm' />
                    <input type="password" placeholder='Password' className='bg-gray-600 p-4 h-15 rounded-sm' />
                </div>
                <div className='flex flex-col items-center w-full text-black gap-4'>
                    <GoogleLogin
                        width={100}
                        onSuccess={credentialResponse => {
                            var Response = jwtDecode(credentialResponse.credential!);
                            console.log(Response);
                            navigate('/layout');
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />;
                    <button onClick={()=>handleGoogleLogin()} className='flex justify-center gap-5 items-center bg-white'>connexion via numeros <FaPhoneAlt /></button>
                </div>
            </div>
        </div>
    )
}

export default Login