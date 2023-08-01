import React, {useState} from 'react'
import Input from '../../../conponents/Input/Input'
import Button from '../../../conponents/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import AuthLogin from '../AuthLogin/AuthLogin'
import './SignUp.scss'
import axios from 'axios'

const initialUser = {email: "", password: "", username: ""}
const SignUp = () => {
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();
    const SignUp = async () => {
        try {
            const url = `http://localhost:1337/api/auth/local/register`
            if(user.username && user.email && user.password){
                const res = await axios.post(url, user);
                if(res) {
                    setUser(initialUser);
                    navigate("/sign-in")
                }
            }
        } catch (error) {
            return error
        }
    }

    const handleUserChange = ({target}) => {
        const {name, value} = target;

        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }))
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
              
                        <Input label="FULL NAME"
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleUserChange}
                        />
                        <Input label="EMAIL"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleUserChange}
                        />
                        <Input label="PASSWORD"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleUserChange}
                        />
                        <span >Your information will be kept confidential according to our <Link>privacy policy</Link></span>
                        <div className='btn-register' onClick={() => SignUp()}>
                        <Button name="Register" style={{margin: 10}}/>
                        </div>
               
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