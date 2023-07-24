import React from 'react'
import Product from '../Product/Product'
import { Link } from 'react-router-dom'
import './NewProducts.scss'


const NewProducts = () => {
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
    return (
        <div className='product-hot'>
            <div className='product-hot-header'>
                <h3>HOT TREND</h3>
                <h1>HÀNG MỚI LÊN KỆ</h1>
            </div>
            <div className='product-hot-container'>
                <div className='list-products'>
                    {products.map((product) => {
                        return (
                            <div className='product-new'>
                                <Product product={product} key={product.id}/>
                            </div>
                            
                        )         
                    })}
                    
                </div>

                <Link to='shop' className='product-hot-container-btn'>Xem tất cả</Link>

            </div>
        </div>

    )
}

export default NewProducts