import React from 'react'
import './FlashSale.scss'

import Slide from '../Slide/Slide'


const FlashSale = () => {
    const products = [
        {
            id: 1,
            name: 'Kính cận',
            price: 220000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 2,
            name: 'Kính cận 2',
            price: 203000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 3,
            name: 'Kính cận 3',
            price: 200200,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 4,
            name: 'Kính cận 4',
            price: 200200,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 5,
            name: 'Kính cận 5',
            price: 201000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 6,
            name: 'Kính cận 46',
            price: 206000,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            id: 7,
            name: 'Kính cận 56',
            price: 200800,
            price_sale: 150000,
            img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        }
    ]
    return (
        <div className='flash-sale'>
            <div className='flash-sale-header'>
                <h1>SĂN FLASH SALE</h1>
                <p>Hàng trăm sản phẩm bắt trend mới nhất</p>
            </div>
            <div className='flash-sale-container'>
               
                {/* <Product /> */}
                <Slide products={products} slidesToShow={5} autoplaySpeed={3000}/>
            </div>
        </div>
    )
}

export default FlashSale