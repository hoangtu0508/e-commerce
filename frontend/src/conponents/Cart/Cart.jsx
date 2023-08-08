import React, { useContext, useState } from 'react'
import './Cart.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'
import { Context } from '../../utils/AppContext'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { BsCartX } from 'react-icons/bs'
import { loadStripe } from "@stripe/stripe-js"
import { makePaymentRequest } from '../../utils/api'
import { getUser } from '../../helpers'

const Cart = ({ setShowCart }) => {
    const { cartItems, removeItemCart, handleCartProductQuantity } = useContext(Context)
    // const [cart, setCart] = useState(cartProducts)

    // const [total, setTotal] = useState(0)

    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.attributes.ProductPrice * item.attributes.qty;
    }, 0);


    const navigate = useNavigate()

    const handleViewCart = () => {
        setShowCart(false)
        navigate('basket')
    }

    const handleReturnToHome = () => {
        setShowCart(false)
        navigate('/')

    }



    const stripePromise = loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    );
    const userProfile = getUser()
    const userId = userProfile.id
    console.log(userId)

    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makePaymentRequest.post("/api/orders", {
                products: cartItems,
                userId: userId,
                status: 'Processing'
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    

    return (
        <div className='cart-panel'>
            <div className='cart-layer' onClick={() => setShowCart(false)}>
            </div>
            <div className='cart-content'>
                <div className='cart-close'>
                    <span onClick={() => setShowCart(false)}><AiOutlineClose className='cart-close-icon' /></span>
                </div>
                <div className='cart-title'>
                    <h3>Shopping Cart</h3>
                </div>

                {!!cartItems?.length &&
                    <>
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
                                           

                                            <div className='quantity'>
                                                <span onClick={() => handleCartProductQuantity("dec", productCart)}>-</span>
                                                <span>{productCart.attributes.qty}</span>
                                                <span onClick={() => handleCartProductQuantity("inc", productCart)}>+</span>
                                            </div>
                                        </div>
                                        <span onClick={() => removeItemCart(productCart)}><MdDeleteForever className='dele-cart-product' /></span>
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
                            <button onClick={() => handlePayment()}>CHECK OUT</button>
                        </div>
                    </>

                }

                {!cartItems?.length &&
                    <>
                        <div className='no-product-cart'>
                            <div className='icon'>
                                <span><BsCartX className='icon-cartX' /></span>
                            </div>
                            <div className='btn' onClick={() => handleReturnToHome()}>
                                <Button name='RETURN TO SHOP'></Button>
                            </div>
                        </div>
                    </>

                }
            </div>
        </div >
    )
}

export default Cart