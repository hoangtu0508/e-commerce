import React from 'react'
import {GiSunglasses} from 'react-icons/gi'
import {BiSearchAlt} from 'react-icons/bi'
import {FaSun} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import {IoMdNotificationsOutline} from 'react-icons/io'
import './Header.scss'

const Header = () => {
  return (
    <div className='admin-header'>
        <div className='admin-header-logo'>
            <GiSunglasses className='admin-header-logo-icon'/>
        </div>
        <div className="admin-header-items">
            <div className='admin-header-items-search'>
                <BiSearchAlt className='admin-header-items-search-icon'/>
            </div>
            <div className='admin-header-items-menu'>
                <ul>
                    <li><FaSun className='admin-header-items-menu-icon'/></li>
                    <li><IoMdNotificationsOutline className='admin-header-items-menu-icon'/></li>
                    <li><CgProfile className='admin-header-items-menu-icon'/></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Header