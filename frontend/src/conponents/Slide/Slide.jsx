import React, { useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slide.scss'

const Slide = () => {


    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    }
    return (
        <div className='slide'>
            <Slider {...settings}>
                <div className='slide-img'>
                    <img src='https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-06-768x983.jpg'></img>
                </div>
                <div className='slide-img'>
                    <img src='https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-04-768x983.jpg'></img>
                </div>
                <div className='slide-img'>
                    <img src='https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-03-768x983.jpg'></img>
                </div>
                <div className='slide-img'>
                    <img src='https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-02-768x983.jpg'></img>
                </div>
                <div className='slide-img'>
                    <img src='https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-05-768x983.jpg'></img>
                </div>
            </Slider>
        </div >
    );
}
export default Slide