import React from 'react'
import './SlideFlashSale.scss'

const SlideFlashSale = ({product}) => {
  console.log('flash:',product)
    return (
        <div className='product-slide-item'>
          <div className='product-slide-item-img'>
            <img src={product.img} alt='' />
          </div>
          <div className='product-slide-item-details'>
            <h3>
              {product.name} - {product.id}
            </h3>
            <h3>
              {product.price_sale}đ <span>{product.price}đ</span>
            </h3>
          </div>
        </div>
      );
}

export default SlideFlashSale