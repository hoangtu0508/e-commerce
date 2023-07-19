import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GiSunglasses } from 'react-icons/gi'
import { BsSearch, BsCartCheck } from 'react-icons/bs'
import './Nav.scss'

const Nav = () => {
    const location = useLocation()
    return (
        <nav className='nav'>
            <div className='nav-left'>
                <div className='nav-left-logo'>
                    <span className='nav-left-logo-icon'>
                        <Link to='/'>
                            <GiSunglasses style={{ width: 70, height: 70 }} />
                        </Link>
                    </span>
                </div>
                <ul className='nav-left-menu'>
                    <li className={location.pathname === '/' ? 'nav-left-menu active' : 'nav-left-menu'}>
                        <Link to='/'>Home</Link>
                    
                    </li>
                    <li><Link to='shop'>Shop</Link></li>
                    <li><Link to='blog'>Blog</Link></li>
                </ul>
            </div>
            <div className='nav-search'>
                <span><BsSearch /></span>
                <input></input>
            </div>
            <ul className='nav-right'>
                <li className='nav-right-cart'><Link to='cart'><span><BsCartCheck style={{width: 25, height: 25}}/></span></Link></li>
                <li className='nav-right-btn'>
                    <Link to='sign-up'>Sign Up</Link>
                    <Link to='sign-in'>Sign In</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav