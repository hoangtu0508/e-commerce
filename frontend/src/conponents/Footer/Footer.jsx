import React from 'react'
import './Footer.css'
import {BsFacebook, BsInstagram, BsTiktok, BsShop} from 'react-icons/bs'
import {GiSunglasses} from 'react-icons/gi'

const Footer = () => {
  return (
    <footer>
        <div className='footer-one'>
            <h3>Chính sách mua hàng</h3>
            <ul>
                <li>Hình thức thanh toán</li>
                <li>Chính sách giao hàng</li>
                <li>Chính sách bảo hành</li>
            </ul>
        </div>
        <div className='footer-two'>
            <h3>Danh mục sản phẩm</h3>
        </div>
        <div className='footer-three'> 
            <h3>Truy cập nhanh</h3>
            <ul>
                <li>Trang chủ</li>
                <li>Trang sản phẩm</li>
                <li>Trang Blog</li>
            </ul>
        </div>
        <div className='footer-four'>
            <h3>Về chúng tôi</h3>
            <div className='footer-four-logo'>
                <span><GiSunglasses style={{ width: 70, height: 70 }} /></span>
            </div>
            <span><BsFacebook /></span>
            <span><BsInstagram /></span>
            <span><BsTiktok/></span>
            <span><BsShop /></span>
        </div>
    </footer>
  )
}

export default Footer