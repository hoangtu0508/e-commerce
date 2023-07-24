import React, { useState } from 'react'
import './Product.scss'
import { AiOutlineStar, AiOutlineHeart, AiOutlineArrowDown } from 'react-icons/ai'

const Product = ({ product }) => {
    console.log('prd',product)
    if (!product) {
        return null; // hoặc có thể trả về một thông báo lỗi
    }
    return (

        <>
            <div className='product-show' key={product.id}>
                <div className='product-show-img'>
                    <img src={product.img}></img>
                </div>
                <div className='product-show-content'>
                    <div className='product-title'>
                        <div className='title-price'>
                            <h3>{product.name}</h3>
                            <h3>{product.price_sale}đ <span>{product.price}đ</span></h3>
                        </div>
                        <div className='price-percent'>
                            <span><AiOutlineArrowDown />{Math.round(((product.price - product.price_sale) / product.price) * 100)}%</span>
                        </div>
                    </div>
                    <div className='btn-add-cart'>
                        <button>ADD TO CART</button>
                        <div className='cart-icons-btn'>
                            <div className='star'>
                                <span><AiOutlineStar /></span>
                                <span><AiOutlineStar /></span>
                                <span><AiOutlineStar /></span>
                                <span><AiOutlineStar /></span>
                                <span><AiOutlineStar /></span>
                            </div>
                            <div className='heart'>
                                <span><AiOutlineHeart /></span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Product