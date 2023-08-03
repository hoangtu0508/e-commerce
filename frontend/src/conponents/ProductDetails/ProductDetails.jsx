import React, { useContext, useState } from 'react'
import './ProductDetails.scss'
import { useParams } from 'react-router-dom'
import { FaCarSide } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import Button from '../Button/Button'
import Slide from '../Slide/Slide'
import useFetch from '../../hooks/useFetch'
import { Context } from '../../utils/AppContext'

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
  const [qty, setQty] = useState(1)

  const {addToCart,cartItems} = useContext(Context)
  console.log(cartItems)
  if(!data) return;

  const product = data.data[0].attributes
  // const product = products.find((item) => item.id === parseInt(id))

  const decrement = () => {
    setQty((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };
  const increment = () => {
    setQty((prevState) => prevState + 1);
  };
  return (
    <div className='product-detail-page'>
      <div className='product-detail'>
        <div className='img-product'>
          <img src={process.env.REACT_APP_DEV_URL + product.ProductImg.data[0].attributes.url}></img>
        </div>

        <div className='content-product'>
          <div className='product-title'>
            <h1>{product.ProductName}</h1>
            <p>{product.ProductPrice}.Đ</p>
            <span><p>{product.ProductPrice}.Đ</p></span>
            <div className='product-text'>
              <span><FaCarSide className='icon-car' /></span>
              <span>Miễn phí giao hàng từ 500k ( vận chuyển 3 - 5 ngày )</span>

            </div>
            <div className='product-qty'>
              <span onClick={decrement}>-</span>
              {/* <input type="number"
              value={qty}
              min={0}
            >
            </input> */}
              <span>{qty}</span>
              <span onClick={increment}>+</span>
            </div>
            <div className="product-btn">
              <span><AiOutlineHeart className='icon-heart' /></span>
              <div className="btn-add-cart" onClick={() => {addToCart(data.data[0], qty);setQty(1)}}>
                <Button name='Add to cart' />
              </div>
            </div>
            <hr />
            <div className='product-describe'>
              <p>{product.ProductDesc}</p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default ProductDetails