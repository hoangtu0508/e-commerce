import React, {useState} from 'react'
import Input from '../../../conponents/Input/Input'
import Button from '../../../conponents/Button/Button'
import { Link } from 'react-router-dom'
import AuthLogin from '../AuthLogin/AuthLogin'
import './SignUp.scss'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    return (
        <div className='sign-up'>
            <div className='sign-up-left'>
                <img src='https://kinhmatanna.com/wp-content/uploads/2022/06/Rectangle-93.jpg'></img>
            </div>

            <div className='sign-up-right'>
                <div className='header-title'>
                    <h1>Register</h1>
                    <p>Sign up to enjoy many exclusive privileges for you</p>
                    <hr />
                </div>

                <div className='input-from'>
                    <form>
                        <Input label="FULL NAME"
                            type="text"
                            name="name"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <Input label="EMAIL"
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <Input label="PASSWORD"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Input label="RE-PASSWORD"
                            type="re-password"
                            name="re-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <span >Your information will be kept confidential according to our <Link>privacy policy</Link></span>
                        <Button name="Register" style={{margin: 10}}/>
                    </form>
                    <span>Or</span>
                    <AuthLogin />
                    <div className='btn-sign-us'>
                        <span>Do you already have an account</span><br />
                        <Link>Sign In here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp