import React from 'react'
import Banner from '../../conponents/Header/Banner/Banner'
import Slide from '../../conponents/Slide/Slide'
import './Home.scss'
import Product from '../../conponents/Product/Product'
import { Link } from 'react-router-dom'
import FlashSale from '../../conponents/FlashSale/FlashSale'
import NewProducts from '../../conponents/NewProducts/NewProducts'


const Home = () => {
  return (
    <div className='home-page'>
      <Banner />
      <div className='home-page'>
        <FlashSale />

        <NewProducts />
      </div>

    </div>
  )
}

export default Home