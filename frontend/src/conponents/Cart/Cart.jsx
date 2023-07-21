import React, { useState } from 'react'
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

    const [cart, setCart] = useState(cartProducts)

    console.log(cart)

    const [total, setTotal] = useState(0)

    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.productPrice * item.Vty;
    }, 0);

    const handleDele = (Id) => {
        const shouldDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");
        if (shouldDelete) {
            const cartNews = cart.filter((item => item.idProduct !== Id));
            setCart(cartNews);
        }
    }

    const handleOnChang = (e) => {

    }

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
                    {cart.map((productCart) => {
                        console.log('prd', productCart)
                        return (
                            < div className='cart-product' key={productCart.id} >
                                <div className='cart-product-content'>
                                    <img src={productCart.imgProduct}></img>
                                    <div className='cart-product-detail'>
                                        <h3>{productCart.productName}</h3>
                                        <p>{productCart.Vty} x {productCart.productPrice}</p>

                                    </div>
                                    <input type="number"
                                        value={productCart.Vty}
                                        onChange={(e) => {
                                            const index = cart.findIndex((item) => item.idProduct === productCart.idProduct);
                                            const newCart = [...cart];
                                            newCart[index].Vty = parseInt(e.target.value);
                                            if (newCart[index].Vty === 0) {
                                                const showDele = window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")
                                                if (showDele) {
                                                    newCart.splice(index, 1);
                                                } else {
                                                    newCart[index].Vty = 1;
                                                }

                                            }
                                            setCart(newCart);
                                        }}
                                        min={0}
                                    >
                                    </input>
                                </div>
                                <span onClick={() => handleDele(productCart.idProduct)}><MdDeleteForever className='dele-cart-product' /></span>
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
                    <button>VIEW CART</button>
                    <button>CHECK OUT</button>
                </div>
            </div>
        </div >
    )
}

export default Cart