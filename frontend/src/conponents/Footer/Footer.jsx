import React from 'react'
import './Footer.scss'
import { BsFacebook, BsInstagram, BsTiktok, BsShop } from 'react-icons/bs'
import { GiSunglasses } from 'react-icons/gi'
import Button from '../Button/Button'

const Footer = () => {
    return (
        <footer>
            <div className='footer'>
                <div className='footer-one'>
                    <h3>PURCHASE POLICY</h3>
                    <ul>
                        <li>PAYMENTS</li>
                        <li>DELIVERY POLICY</li>
                        <li>WARRANTY POLICY</li>
                    </ul>
                </div>
                <div className='footer-two'>
                    <h3>CATEGORIES</h3>
                </div>
                <div className='footer-three'>
                    <h3>FAST ACCESS</h3>
                    <ul>
                        <li>Home Page</li>
                        <li>Shop Page</li>
                        <li>Blog Page</li>
                    </ul>
                </div>
                <div className='footer-four'>
                    <h3>ABOUT US</h3>
                    <div className='footer-four-logo'>
                        <span><GiSunglasses style={{ width: 70, height: 70 }} /></span>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.</p>
                    </div>

                </div>
            </div>
            <hr></hr>
            <div className='footer-us'>
                <div className='follow-us-icons'>
                    <h2>FOLLOW US</h2>
                    <div className='follow-us-icon'>
                        <span><BsFacebook className='icon' /></span>
                        <span><BsInstagram className='icon'/></span>
                        <span><BsTiktok className='icon'/></span>
                        <span><BsShop className='icon'/></span>
                    </div>
                </div>
                <div className='follow-us-input'>
                    <h2>DON'T MISS OUT ON THE LATEST</h2>
                    <div className='input'>
                        <input></input>
                        <Button name='SUBSCRIBE!'/>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer