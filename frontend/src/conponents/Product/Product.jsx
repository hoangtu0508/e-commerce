import React, { useState } from 'react'
import './Product.scss'
import { AiOutlineStar, AiOutlineHeart,AiOutlineArrowDown } from 'react-icons/ai'

const Product = () => {
    const products = [
        {
            id: 1,
            name: 'Kính cận',
            price: 200000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 2,
            name: 'Kính cận 2',
            price: 200000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 3,
            name: 'Kính cận 3',
            price: 200000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 4,
            name: 'Kính cận 4',
            price: 200000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 5,
            name: 'Kính cận 5',
            price: 200000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        }
    ]

    const [percent, setPercent] = useState(0)

    return (
        <div className='product'>
            {products.map((product) => {
                return (
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
                                    <span><AiOutlineArrowDown/>{Math.round(((product.price - product.price_sale)/product.price)*100)}%</span>
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
                )
            })}
        </div>
    )
}

export default Product