import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { FaUserAlt, FaRegImage, FaUserEdit,FaShoppingCart } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { BiSolidLogOutCircle } from 'react-icons/bi'
import './Profile.scss'
import { getCurrentUser, getUser } from '../../../../helpers';
import {BsEmojiSunglasses} from 'react-icons/bs'
import { Context } from '../../../../utils/AppContext';

const Profile = ({ setIsLogin }) => {

  const navigate = useNavigate()
  function handleLogout() {
    localStorage.clear();
    // localStorage.removeItem('userInfo');
    setIsLogin(false);
    navigate('/')
  }

  const {userData} = useContext(Context)
  return (
    <div className='profile'>
      <div className='profile_account'>
        {/* <img
          src=''
          //   alt="user profile"
          width={50}
          height={50}
          className='profile_account_img'
        /> */}
        <span><BsEmojiSunglasses className='profile-icon' /></span>

        <div className='profile_account_info'>
          <p>{userData?.username || "Guest"}</p>
        </div>
      </div>

      <div className='profile_menu'>
        <div className='profile_menu_one'>
          <div className='profile_menu_one_item'>
            <p>
              <Link to={'profile/my-profile'}><FaUserAlt className='icon_item' /><span className='text-item'>My Profile</span></Link>
            </p>
          </div>
          <div className='profile_menu_one_item'>
            <p>
              <Link to={'profile/edit-profile'}><FaUserEdit className='icon_item' /><span className='text-item'>Edit Profile</span></Link>
            </p>
          </div>
          <div className='profile_menu_one_item'>
            <p>
              <Link href={{ pathname: "/author" }}><FaRegImage className='icon_item' /><span className='text-item'>My Items</span></Link>
            </p>
          </div>
          <div className='profile_menu_one_item'>
            <p>
              <Link to={'profile/order'}><FaShoppingCart className='icon_item' /><span className='text-item'>Order</span></Link>
            </p>
          </div>
          <div className='profile_menu_one_item'>
            <p>
              <Link onClick={handleLogout}><BiSolidLogOutCircle className='icon_item' /><span className='text-item'>Logout</span></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile