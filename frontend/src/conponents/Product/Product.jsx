import React from 'react'
import './Product.scss'

const products = [
    {
        id: 1,
        name: 'Kính cận',
        price: 20000,
        img: 'https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-06-768x983.jpg'
    },
    {
        id: 2,
        name: 'Kính cận 2',
        price: 20000,
        img : 'https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-06-768x983.jpg'
    },
    {
        id: 3,
        name: 'Kính cận 3',
        price: 20000,
        img: 'https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-06-768x983.jpg'
    },
    {
        id: 4,
        name: 'Kính cận 4',
        price: 20000,
        img: 'https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-06-768x983.jpg'
    },
    {
        id: 5,
        name: 'Kính cận 5',
        price: 20000,
        img: 'https://kinhmatanna.com/wp-content/uploads/2023/04/Untitled-4-01-01-06-768x983.jpg'
    }
]

const Product = () => {
  return (
    <div className='product'>
        {products.map((product) => {
            return (
                <div className='product-show'>
                    <div className='product-show-img'><img src={product.img}></img></div>
                    <div className='product-show-content'>
                        <label>Tên: {product.name}</label><br/>
                        <label>Giá: {product.price}</label>
                    </div>
                </div>
            )
            })}
    </div>
  )
}

export default Product