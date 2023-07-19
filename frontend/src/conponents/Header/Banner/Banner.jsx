import React from 'react'
import { GiSunglasses } from 'react-icons/gi'
import './Banner.scss'
import { Link } from 'react-router-dom'
import Slide from '../../Slide/Slide'

const Banner = () => {
    return (
        <div className='banner'>
            <div className='banner-title'>
                <h3>See better than yesterday - <span><GiSunglasses ></GiSunglasses></span> love you!</h3>
            </div>
            <div className='banner-content'>
                <div className='banner-content-title'>
                    <span><GiSunglasses style={{ width: 150, height: 150 }} /></span>
                    <h1>See <span>everything with</span> Clarity</h1>
                    <p>Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.</p>
                    <Link to='shop' className='banner-content-title-btn'>Shop now</Link>
                </div>
                <div className='banner-content-img'>
                    <img src='https://salinaka-ecommerce.web.app/images/banner-girl.789f1fa6f451ad26c5039fcbc049ace7.png'></img>
                </div>
            </div>
            <div className='banner-slides'>
                <div className='banner-slides-img'>
                    <img src='https://kinhmatanna.com/wp-content/uploads/2023/04/261kb-1536x964.jpg'></img>
                </div>
                <div className='banner-slides-slides'>
                    <Slide />
                </div>
            </div>
        </div>
    )
}

export default Banner