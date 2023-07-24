import React, { useState } from 'react'
import './SignIn.scss'
import Nav from '../../../conponents/Header/Nav/Nav'
import Footer from '../../../conponents/Footer/Footer'
import Input from '../../../conponents/Input/Input'
import Button from '../../../conponents/Button/Button'
import LinkFieds from '../../../conponents/LinkFieds/LinkFieds'
import { Link } from 'react-router-dom'
import AuthLogin from '../AuthLogin/AuthLogin'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
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
                        <form>
                            <Input label="EMAIL"
                                type="text"
                                name="name"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <Input label="PASSWORD"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <div className='radio'>
                                <label>Save Account</label>
                                <input type='radio'></input>
                            </div>
                            <Button name="LOGIN" />
                        </form>
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