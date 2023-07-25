import React, { useState } from 'react'
import './ProductDetails.scss'
import { useParams } from 'react-router-dom'
import { FaCarSide } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import Button from '../Button/Button'
import Slide from '../Slide/Slide'

const ProductDetails = () => {
  const { id } = useParams();
  const products = [
    {
      id: 1,
      name: 'Kính cận',
      price: 200000,
      price_sale: 150000,
      describe: 'Miễn phí giao hàng từ 500k ( vận chuyển 3 - 5 ngày )',
      img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
    },
    {
      id: 2,
      name: 'Kính cận 2',
      price: 200000,
      price_sale: 150000,
      describe: 'Miễn phí giao hàng từ 500k ( vận chuyển 3 - 5 ngày )',
      img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
    },
    {
      id: 3,
      name: 'Kính cận 3',
      price: 200000,
      price_sale: 150000,
      describe: 'Miễn phí giao hàng từ 500k ( vận chuyển 3 - 5 ngày )',
      img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
    },
    {
      id: 4,
      name: 'Kính cận 4',
      price: 200000,
      price_sale: 150000,
      describe: 'Miễn phí giao hàng từ 500k ( vận chuyển 3 - 5 ngày )',
      img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
    },
    {
      id: 5,
      name: 'Kính cận 5',
      price: 200000,
      price_sale: 150000,
      describe: 'Miễn phí giao hàng từ 500k ( vận chuyển 3 - 5 ngày )',
      img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
    },
    {
      id: 6,
      name: 'Kính cận 5',
      price: 200000,
      price_sale: 150000,
      describe: 'Miễn phí giao hàng từ 500k ( vận chuyển 3 - 5 ngày )',
      img: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
    }
  ]

  const product = products.find((item) => item.id === parseInt(id))

  const [qty, setQty] = useState(1)

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
          <img src={product.img}></img>
        </div>

        <div className='content-product'>
          <div className='product-title'>
            <h1>{product.name}</h1>
            <p>{product.price}.Đ</p>
            <span><p>{product.price_sale}.Đ</p></span>
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
              <div className="btn-add-cart">
                <Button name='Add to cart' />
              </div>
            </div>
            <hr />
            <div className='product-describe'>
              <p>{product.describe}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='product-sale'>
        <h2>Featured products</h2>
        <Slide products={products} slidesToShow={5} autoplaySpeed={2000} />
      </div>
    </div>
  )
}

export default ProductDetails