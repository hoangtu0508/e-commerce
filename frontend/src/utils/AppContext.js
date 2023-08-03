import React, { createContext, useEffect, useState } from 'react'

export const Context = createContext()

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartSubTotal, setCartSubTotal] = useState(0)

  useEffect(() => {}, [cartItems]);

  const addToCart = (product, qty) => {
    let items = [...cartItems];
    let index = items.findIndex(p => p.id === product.id)
    if(index !== -1) {
      items[index].attributes.qty += qty
    } else {
      product.attributes.qty = qty
      items = [...items, product];
    }
    setCartItems(items);
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
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default AppContext