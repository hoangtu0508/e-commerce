import React, {useContext, useEffect, useState} from 'react'
import './Profile.scss'
import { BsEmojiSunglasses } from 'react-icons/bs'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaRegImage, FaUserEdit,FaShoppingCart} from "react-icons/fa";
import { BiSolidLogOutCircle } from 'react-icons/bi'
import { getUser } from '../../helpers';
import { getUserProfile } from '../../utils/api';
import { Context } from '../../utils/AppContext';

const Profile = () => {

    const {userData, setUserData} = useContext(Context)

    const navigate = useNavigate()
    function handleLogout() {
        localStorage.clear();
        navigate('/')
        // localStorage.removeItem('userInfo');
    }

    return (
        <div className='profile-page'>
            <div className='left-profile'>
                <div className='left-profile-img'>
                    <span><BsEmojiSunglasses className='left-profile-icon' /></span>
                </div>
                <div className='left-profile-title'>
                    <h2>{userData.username || "Guest"}</h2>
                    <h4>{userData.email}</h4>
                </div>
                <hr />

                <div className='left-profile-link'>
                    <div className='left-profile-link-item'>
                        <p>
                            <Link to={'/profile/my-profile'}><FaUserAlt className='icon_item' /><span className='text-item'>My Profile</span></Link>
                        </p>

                    </div>
                    <div className='left-profile-link-item'>
                        <p>
                            <Link to={'/profile/edit-profile'}><FaUserEdit className='icon_item' /><span className='text-item'>Edit Profile</span></Link>
                        </p>

                    </div>
                    <div className='left-profile-link-item'>
                        <p>
                            <Link to={'profile'}><FaRegImage className='icon_item' /><span className='text-item'>My Items</span></Link>
                        </p>

                    </div>
                    <div className='left-profile-link-item'>
                        <p>
                            <Link to={'order'}><FaShoppingCart className='icon_item' /><span className='text-item'>Order</span></Link>
                        </p>

                    </div>
                    <div className='left-profile-link-item'>
                        <p>
                            <Link onClick={handleLogout}><BiSolidLogOutCircle className='icon_item' /><span className='text-item'>Logout</span></Link>
                        </p>

                    </div>
                    
                </div>
            </div>

            <div className='right-profile'>
                <Outlet userData={userData}/>
            </div>
        </div>
    )
}

export default Profile