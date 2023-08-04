import React, { createContext, useEffect, useState } from 'react'
import { getToken } from '../helpers'
import Strapi from 'strapi-sdk-js'
import axios from 'axios'

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

  useEffect(() => { }, [cartItems]);

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

    // try {
    //   const cartData = { items };
    //   console.log(cartData)
    //   console.log(jwt)
    //   if (!!jwt) {
    //     await axios.post("http://localhost:1337/api/carts",
    //       {cartData},
    //       {
    //         headers: {
    //           Authorization: `bearer ${jwt}`,
    //         },
    //       }
    //     )
    //   }
    //   // const response = await strapi.request('/api/carts', {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     Authorization: `bearer ${token}`,
    //   //     'Content-Type': 'application/json'
    //   //   },
    //   //   body: JSON.stringify(cartData)
    //   // });
    //   // if(!!token) {
    //   //   await axios.post("http://localhost:1337/api/carts") {
    //   //     data: {

    //   //     }
    //   //   }
    //   // }
    //   // console.log('Cart saved to Strapi:', response);
    // } catch (error) {
    //   console.error('Error saving cart to Strapi:', error);
    // }
  }

  const removeItemCart = (product) => {
    let items = [...cartItems];
    items = items.filter((p) => p.id !== product.id);
    setCartItems(items);
  }
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
        removeItemCart
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default AppContext