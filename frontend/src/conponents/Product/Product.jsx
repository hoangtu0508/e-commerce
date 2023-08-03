import React, { useState } from 'react'
import './Product.scss'
import { AiOutlineStar, AiOutlineHeart, AiOutlineArrowDown } from 'react-icons/ai'
import ProductDetails from '../ProductDetails/ProductDetails'
import { Context } from '../../utils/AppContext'
import { useContext } from 'react'

const Product = ({ product }) => {
    const {addToCart, cartItems} = useContext(Context)
    const qty = 1
    console.log(cartItems)
    if (!product) {
        return null; // hoặc có thể trả về một thông báo lỗi
    }
    return (

        <>
            <div className='product-show' key={product.id}>
                <div className='product-show-img'>
                    <a href={`/product/${product.id}`}><img src={process.env.REACT_APP_DEV_URL + product.attributes.ProductImg.data[0].attributes.url}></img></a>
                </div>
                <div className='product-show-content'>
                    <div className='product-title'>
                        <div className='title-price'>
                            <h3>{product.attributes.ProductName}</h3>
                            <h3>{product.attributes.ProductPrice}đ <span>{product.attributes.ProductPrice}đ</span></h3>
                        </div>
                        <div className='price-percent'>
                            <span><AiOutlineArrowDown />{Math.round(((product.attributes.ProductPrice - product.attributes.ProductPrice) / product.attributes.ProductPrice) * 100)}%</span>
                        </div>
                    </div>
                    <div className='btn-add-cart'>
                        <button onClick={() => {addToCart(product, qty)}}>ADD TO CART</button>
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