import React from 'react'
import { Link} from 'react-router-dom';

import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import './Profile.scss'

const Profile = () => {
  return (
    <div className='profile'>
      <div className='profile_account'>
        <img
          src=''
        //   alt="user profile"
          width={50}
          height={50}
          className='profile_account_img'
        />

        <div className='profile_account_info'>
          <p>Shoaib Bhai</p>
        </div>
      </div>

      <div className='profile_menu'>
        <div className='profile_menu_one'>
          <div className='profile_menu_one_item'>
            <p>
              <Link href={{ pathname: "/author" }}><FaUserAlt className='icon_item'/><span>My Profile</span></Link>
            </p>
          </div>
          <div className='profile_menu_one_item'>
            <p>
              <Link href={{ pathname: "/author" }}><FaRegImage className='icon_item'/><span>My Items</span></Link>
            </p>
          </div>
          <div className='profile_menu_one_item'> 
            <p>
              <Link href={{ pathname: "/account" }}><FaUserEdit className='icon_item'/><span>Edit Profile</span></Link>
            </p>
          </div>
        </div>

        <div className='profile_menu_two'>
          <div className='profile_menu_one_item'>
            <p>
              <Link href={{ pathname: "/contactus" }}><MdHelpCenter className='icon_item'/><span>Help</span></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile