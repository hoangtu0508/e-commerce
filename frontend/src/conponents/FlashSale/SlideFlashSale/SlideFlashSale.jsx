import React from 'react'
import './SlideFlashSale.scss'
import { AiOutlineStar, AiOutlineHeart,AiOutlineArrowDown } from 'react-icons/ai'

const SlideFlashSale = ({ product }) => {

  return (
    <div className='product-slide-item'>
      <div className='product-slide-item-img'>
        <a href={`../product/${product.id}`}><img src={process.env.REACT_APP_DEV_URL + product.attributes.ProductImg.data[0].attributes.url} alt='' /></a>
      </div>
      <div className='product-slide-item-details'>
        <div className='product-slide-title'>
          <div className='slide-title'>
            <h3>
            {product.attributes.ProductName}
            </h3>
            <h3>
            {product.attributes.ProductPrice}đ <span>{product.attributes.ProductPrice}đ</span>
            </h3>
          </div>
          <div className='price-percent'>
            <span><AiOutlineArrowDown />{Math.round(((product.attributes.ProductPrice - product.attributes.ProductPrice) / product.attributes.ProductPrice) * 100)}%</span>
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
  );
}

export default SlideFlashSale