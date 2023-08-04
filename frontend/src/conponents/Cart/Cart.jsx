import React, { useContext, useState } from 'react'
import './Cart.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'
import { Context } from '../../utils/AppContext'
import { useNavigate } from 'react-router-dom'

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
    const {cartItems, removeItemCart} = useContext(Context)
    const [cart, setCart] = useState(cartProducts)

    console.log(cartItems)

    const [total, setTotal] = useState(0)

    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.attributes.ProductPrice * item.attributes.qty;
    }, 0);

    const handleDele = (Id) => {
        const shouldDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");
        if (shouldDelete) {
            const cartNews = cartItems.filter((item => item.id !== Id));
            setCart(cartNews);
        }
    }

    const navigate = useNavigate()

    const handleViewCart = () => {
        setShowCart(false)
        navigate('basket')
    }
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
                    {cartItems.map((productCart) => {
                        
                        return (
                            < div className='cart-product' key={productCart.id} >
                                <div className='cart-product-content'>
                                    <img src={process.env.REACT_APP_DEV_URL + productCart.attributes.ProductImg.data[0].attributes.url}></img>
                                    <div className='cart-product-detail'>
                                        <h3>{productCart.attributes.ProductName}</h3>
                                        <p>{productCart.attributes.qty} x {productCart.attributes.ProductPrice}</p>

                                    </div>
                                    <input type="number"
                                        value={productCart.attributes.qty}
                                        onChange={(e) => {
                                            const index = cart.findIndex((item) => item.id === productCart.attributes.id);
                                            const newCart = [...cart];
                                            newCart[index].qty = parseInt(e.target.value);
                                            if (newCart[index].qty === 0) {
                                                const showDele = window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")
                                                if (showDele) {
                                                    newCart.splice(index, 1);
                                                } else {
                                                    newCart[index].qty = 1;
                                                }

                                            }
                                            setCart(newCart);
                                        }}
                                        min={0}
                                    >
                                    </input>
                                </div>
                                <span onClick={() => removeItemCart()}><MdDeleteForever className='dele-cart-product' /></span>
                            </div>
                        )
                    })}

                    <div className='cart-total'>
                        <h3>Subtotal: </h3>
                        <p>{totalPrice}.đ</p>
                    </div>
                </div>
                <hr></hr>
                <div className='cart-button'>
                    <button onClick={() => handleViewCart()}>VIEW CART</button>
                    <button>CHECK OUT</button>
                </div>
            </div>
        </div >
    )
}

export default Cart