import React, { useContext } from 'react'
import './Shop.scss'
import SliderBar from '../../conponents/SliderBar/SliderBar'
import Product from '../../conponents/Product/Product'
import Slide from '../../conponents/Slide/Slide'
import { Context } from '../../utils/AppContext'

const Shop = () => {
  const {products} = useContext(Context)
  
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