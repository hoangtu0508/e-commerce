import React from 'react'
import './Cart.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'

const Cart = ({ setShowCart }) => {
    const cartProducts = [
        {
            idProduct: 1,
            productName: 'Kính 1',
            Vty: 2,
            productPrice: 100000,
            imgProduct: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            idProduct: 2,
            productName: 'Kính 1',
            Vty: 3,
            productPrice: 102000,
            imgProduct: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        },
        {
            idProduct: 3,
            productName: 'Kính 1',
            Vty: 1,
            productPrice: 108000,
            imgProduct: 'https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_4082-copy-1-300x300.jpg'
        }
    ]

    // const totalProduct = () = {

    // }
    return (
        <div className='cart-panel'>
            <div className='cart-layer'>
            </div>
            <div className='cart-content'>
                <div className='cart-close'>
                    <span onClick={() => setShowCart(false)}><AiOutlineClose className='cart-close-icon' /></span>
                </div>
                <div className='cart-title'>
                    <h3>Shopping Cart</h3>
                </div>
                <div className='cart-products'>
                    {cartProducts.map((productCart) => {
                        return (
                            <div className='cart-product' key={productCart.id}>
                                <div className='cart-product-content'>
                                    <img src={productCart.imgProduct}></img>
                                    <div className='cart-product-detail'>
                                        <h3>{productCart.productName}</h3>
                                        <p>{productCart.Vty} x {productCart.productPrice}</p>

                                    </div>
                                    <input type="number"
                                        value={productCart.Vty}
                                    // onChange={(event) =>
                                    //     handleQuantityChange(i, parseInt(event.target.value))
                                    // }
                                    >
                                    </input>
                                </div>
                                <span><MdDeleteForever className='dele-cart-product' /></span>
                            </div>
                        )

                    })}

                    <div className='cart-total'>
                        <h3>Subtotal:</h3>
                        <p>đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart