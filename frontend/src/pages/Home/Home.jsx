import React from 'react'
import Banner from '../../conponents/Header/Banner/Banner'
import Slide from '../../conponents/Slide/Slide'
import './Home.scss'
import Product from '../../conponents/Product/Product'

const Home = () => {
  return (
    <div className='home-page'>
      <Banner />
      <div className='home-page'>
        <div className='home-page-flash-sale'>
          <div className='home-page-flash-sale-header'>
            <h1>SĂN FLASH SALE</h1>
            <p>Hàng trăm sản phẩm bắt trend mới nhất</p>
          </div>
          <div className='home-page-flash-sale-container'>
            <Product />
          </div>
        </div>

        <div className='home-page-product-hot'>
          <div className='home-page-product-hot-header'>
            <h3>HOT TREND</h3>
            <h1>HÀNG MỚI LÊN KỆ</h1>
          </div>
          <div className='home-page-product-hot-container'>
            <Product />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home