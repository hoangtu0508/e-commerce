import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slide.scss';
import SlideFlashSale from '../FlashSale/SlideFlashSale/SlideFlashSale';

const Slide = ({ images = [], products = [] , slidesToShow, autoplaySpeed }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: autoplaySpeed,
    };
    // const {products} = props

    return (
        <div className='slide'>
            <Slider {...settings}>
                {images &&
                    images.map((image, index) => (
                        <div className="slide-img" key={index}>
                            <img src={image} alt="" />
                        </div>
                    ))}
                {products &&
                    products.map((product, index) => (
                        <SlideFlashSale key={index} product={product}/>
                    ))}
            </Slider>
        </div>
    );
};

export default Slide;