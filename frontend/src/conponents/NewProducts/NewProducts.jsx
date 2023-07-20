import React from 'react'
import Product from '../Product/Product'
import { Link } from 'react-router-dom'
import './NewProducts.scss'


const NewProducts = () => {
    return (
        <div className='product-hot'>
            <div className='product-hot-header'>
                <h3>HOT TREND</h3>
                <h1>HÀNG MỚI LÊN KỆ</h1>
            </div>
            <div className='product-hot-container'>
                <Product />
                <Product />
                <Link to='shop' className='product-hot-container-btn'>Xem tất cả</Link>

            </div>
        </div>

    )
}

export default NewProducts