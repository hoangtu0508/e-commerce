import React from 'react'
import './AuthLogin.scss'
import {FaFacebook} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import { Link } from 'react-router-dom'

const AuthLogin = () => {
    return (
        <div className='auth-login'>
            <div className='login-fb'>
                <Link>
                    <span className='login-fb-icon'><FaFacebook /></span>
                    <span className='login-fb-text'>Login with Facebook</span>
                </Link>
            </div>
            <div className='login-google'>
                <Link>
                    <span className='login-gg-icon'><FcGoogle /></span>
                    <span className='login-gg-text'>Login with Google</span>
                </Link>
            </div>
            
        </div>
    )
}

export default AuthLogin