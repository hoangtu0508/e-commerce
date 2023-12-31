import React, { useState } from 'react'
import './SignIn.scss'
import Input from '../../../conponents/Input/Input'
import Button from '../../../conponents/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import AuthLogin from '../AuthLogin/AuthLogin'
import { storeUser } from '../../../utils/helpers'
import { fetchData, fetchDataApiToken } from '../../../utils/api'

const initialUser = { password: "", identifier: "" };
const SignIn = () => {
    const [user, setUser] = useState(initialUser)
    const navigate = useNavigate()
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }))
    }

    const handleLogin = async () => {
        const url = `/api/auth/local`
        try {
            if (user.identifier && user.password) {
                const { data } = await fetchDataApiToken.post(url, user);
                const userId = data.user.id
                storeUser(data)
                if (data.jwt) {
                    setUser(initialUser)
                    const { data } = await fetchData.get(`/api/users/${userId}?populate=*`)

                    if (data.role && data.role.type === 'admin') {
                        localStorage.setItem('isAdmin', 'true');
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                    
                }

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='sign-in'>
                <div className='sign-in-left'>
                    <img src='https://kinhmatanna.com/wp-content/uploads/2022/06/Rectangle-93.jpg'></img>
                </div>

                <div className='sign-in-right'>
                    <div className='header-title'>
                        <h1>Login</h1>
                        <p>Please login to enjoy exclusive privileges for you</p>
                        <hr />
                    </div>

                    <div className='input-from'>

                        <Input label="EMAIL"
                            type="email"
                            name="identifier"
                            value={user.identifier}
                            onChange={handleChange}
                        />
                        <Input label="PASSWORD"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                        <div className='radio'>
                            <label>Save Account</label>
                            <input type='radio'></input>
                        </div>
                        <div className='btn-login' onClick={() => handleLogin()}>
                            <Button name="LOGIN" />
                        </div>


                        <div className='forgot-password'>
                            <Link>Forgot password</Link>
                        </div>
                        <AuthLogin /> 
                        <div className='btn-sign-us'>
                            <span>Do not have an account</span><br />
                            <Link>Sign Up here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn