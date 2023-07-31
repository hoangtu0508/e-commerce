import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GiSunglasses } from 'react-icons/gi'
import { RiSearch2Line } from 'react-icons/ri'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import './Nav.scss'
import Cart from '../../Cart/Cart'
import Category from '../../Category/Category'
import DropdownMenu from '../../Dropdown/Dropdown'

const Nav = () => {

    const [showCart, setShowCart] = useState(false)
    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false);
    function handleClick() {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <nav className='nav'>
                <div className='nav-left'>
                    <div className='nav-left-logo'>
                        <span className='nav-left-logo-icon'>
                            <Link to='/'>
                                <GiSunglasses style={{ width: 70, height: 70 }} />
                            </Link>
                        </span>
                    </div>

                </div>

                <div className="nav-center">
                    <ul>
                        <li className={location.pathname === '/' ? 'nav-left-menu active' : 'nav-left-menu'}>
                            <Link to='/'>Home</Link>

                        </li>
                        <li><Link to='shop'>Shop</Link></li>
                        <li className='category'><Category /></li>
                    </ul>
                </div>

                <div className="nav-right">
                    <ul>
                        <li className='nav-search'><span><RiSearch2Line className='icon-search' /></span></li>
                        <li className='nav-right-cart'><span onClick={() => setShowCart(true)}><HiOutlineShoppingBag style={{ width: 25, height: 25 }} /></span></li>
                        <li className='nav-right-btn'>
                            <CgProfile className='icon-profile' onClick={handleClick} />
                            {isOpen && (  
                                <div className="dropdown-content">
                                    <a href="sign-in">Sign In</a>
                                    <a href="sign-up">Sign Up</a>
                                </div>
                            )}
                            {/* <Link to='sign-up'>Sign Up</Link>
                        <Link to='sign-in'>Sign In</Link> */}
                        </li>
                        
                    </ul>
                </div>
            </nav>
            {showCart && <Cart setShowCart={setShowCart} />}
        </>

    )
}

export default Nav