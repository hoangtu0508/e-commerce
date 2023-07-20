import React from 'react'
import './Product.scss'

const Product = () => {
    const products = [
        {
            id: 1,
            name: 'Kính cận',
            price: 20000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 2,
            name: 'Kính cận 2',
            price: 20000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 3,
            name: 'Kính cận 3',
            price: 20000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 4,
            name: 'Kính cận 4',
            price: 20000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 5,
            name: 'Kính cận 5',
            price: 20000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        }
    ]
  return (
    <div className='product'>
        {products.map((product) => {
            return (
                <div className='product-show' key={product.id}>
                    <div className='product-show-img'><img src={product.img}></img></div>
                    <div className='product-show-content'>
                        <h3>{product.name} - {product.id}</h3>
                        <h3>{product.price_sale}đ <span>{product.price}đ</span></h3>
                    </div>
                </div>
            )
            })}
    </div>
  )
}

export default Product