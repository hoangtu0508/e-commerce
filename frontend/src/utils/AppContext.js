import React, { createContext, useEffect, useState } from 'react'
import { getToken } from '../helpers'
import Strapi from 'strapi-sdk-js'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export const Context = createContext()
const jwt = getToken()
const apiUrl = process.env.REACT_APP_DEV_URL
const strapi = new Strapi(apiUrl);

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartSubTotal, setCartSubTotal] = useState(0)
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  useEffect(() => { 
    let count = 0;
    cartItems.map(item => (count += item.attributes.qty))
    setCartCount(count)
  }, [cartItems]);

  const addToCart = async (product, qty) => {
    let items = [...cartItems];
    let index = items.findIndex(p => p.id === product.id)
    if (index !== -1) {
      items[index].attributes.qty += qty
    } else {
      product.attributes.qty = qty
      items = [...items, product];
    }
    setCartItems(items);
  }

  const removeItemCart = (product) => {
    const shouldDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");
    if (shouldDelete) {
      let items = [...cartItems];
      items = items.filter((p) => p.id !== product.id);
      setCartItems(items);
    }

  }

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    if (type === "inc") {
      items[index].attributes.qty += 1;
    } else if (type === "dec") {
      if (items[index].attributes.qty === 1) return;
      items[index].attributes.qty -= 1;
    }
    setCartItems(items);
  };
  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubTotal,
        setCartSubTotal,
        addToCart,
        removeItemCart,
        handleCartProductQuantity
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default AppContext