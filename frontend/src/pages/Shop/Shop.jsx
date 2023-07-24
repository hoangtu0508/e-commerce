import React from 'react'
import './Shop.scss'
import SliderBar from '../../conponents/SliderBar/SliderBar'
import Product from '../../conponents/Product/Product'
import Slide from '../../conponents/Slide/Slide'

const Shop = () => {
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
    },
    {
      id: 6,
      name: 'Kính cận 6',
      price: 200000,
      price_sale: 150000,
      img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
    }
  ]
  return (
    <div className='shop-page'>
      <div className='banner-shop'>
        <h1>ALL PRODUCTS</h1>
      </div>

      <div className='shop-container'>
        <div className='slider-bar'>
          <SliderBar />
        </div>

        <div className='content'>
          <div className='list-products'>
            {products.map((product) => {
              return (
                <div className='all-products'>
                  <Product product={product} />
                </div>

              )
            })}

          </div>


        </div>

      </div>

      <div className='highlights-products'>
        <h2>HIGHLIGHTS PRODUCTS</h2>
        <div className='product-sale'>
          <Slide products={products} slidesToShow={5} autoplaySpeed={2000} />
        </div>
      </div>
    </div>
  )
}

export default Shop