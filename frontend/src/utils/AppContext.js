import React, { createContext, useEffect, useState } from 'react'
import { getToken } from './helpers'
import Strapi from 'strapi-sdk-js'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { fetchData, fetchDataFromApi, getData, getUserProfile, postCartUser } from './api'

export const Context = createContext()
const jwt = getToken()
const apiUrl = process.env.REACT_APP_DEV_URL
const strapi = new Strapi(apiUrl);

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])

  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartSubTotal, setCartSubTotal] = useState(0)
  const [userCart, setUserCart] = useState([])

  const [isLogin, setIsLogin] = useState(false)
  const [userLogin, setUserLogin] = useState()
  const location = useLocation();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetchData.get(`/api/users/${idUser}`);
      setUserLogin(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  const user = JSON.parse(localStorage.getItem('user'))
  const idUser = user?.user.id

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  useEffect(() => {
    if (cartItems) {
      let count = 0;
      cartItems.map(item => (count += item.attributes.qty))
      setCartCount(count)
    }

  }, [cartItems]);

  useEffect(() => {
    getProducts();
    getCategories();
    getOrders();
    getUsers();
  }, []);

  const getProducts = () => {
    fetchDataFromApi("/api/products?populate=*").then((res) => {
      setProducts(res.data);
    });
  };
  const getCategories = () => {
    fetchDataFromApi("/api/categories?populate=*").then((res) => {
      setCategories(res.data);
    });
  };

  const getOrders = () => {
    fetchDataFromApi("/api/orders?populate=*").then((res) => {
      setOrders(res.data);
    });
  };

  const getUsers = async () => {
    try {
      const response = await fetchData.get("/api/users?populate=*");
      const data = response.data;
      setUsers(data);

    } catch (error) {
      console.log(error);

    }
  };

  const addToCart = async (product, qty) => {
    let items = [...cartItems];
    let index = items.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      items[index].attributes.qty += qty;
    } else {
      product.attributes.qty = qty;
      items = [...items, product];
    }

    try {
      const response = await fetchData.post('/api/carts', {
        data: {
          products: items,
          userId: idUser,
        },
      });

      if (response.status === 200) {
        console.log('Dữ liệu đã được thêm mới trên Strapi thành công');
      } else {
        console.log('Thêm mới dữ liệu trên Strapi thất bại');
      }

    } catch (error) {
      console.log('Lỗi khi gửi yêu cầu đến Strapi:', error);
    }

    setCartItems(items);
  };


  const removeItemCart = async (product) => {
    const updatedItems = cartItems.filter((p) => p.id !== product.id);

    try {
      const response = await fetchData.put('api/carts', {
        data: {
          products: updatedItems,
          userId: idUser,
        },
      });

      if (response.status === 200) {
        console.log('Dữ liệu đã được cập nhật trên Strapi thành công');
      } else {
        console.log('Cập nhật dữ liệu trên Strapi thất bại');
      }

      // Cập nhật giỏ hàng trong dữ liệu Strapi
    } catch (error) {
      console.log('Lỗi khi gửi yêu cầu đến Strapi:', error);
    }

    setCartItems(updatedItems);
  };

  const handleCartProductQuantity = async (type, product) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);

    if (type === "inc") {
      items[index].attributes.qty += 1;
    } else if (type === "dec") {
      if (items[index].attributes.qty === 1) return;
      items[index].attributes.qty -= 1;
    }

    // Cập nhật dữ liệu qty trong Strapi
    try {
      const response = await postCartUser.put(`api/carts/${items[index].id}`, {
        data: {
          attributes: {
            qty: items[index].attributes.qty,
          },
        }
      });

      // Kiểm tra phản hồi từ Strapi
      if (response.status === 200) {
        console.log('Dữ liệu qty đã được cập nhật trong Strapi thành công');
      } else {
        console.log('Cập nhật dữ liệu qty trong Strapi thất bại');
      }
    } catch (error) {
      console.log('Lỗi khi gửi yêu cầu đến Strapi:', error);
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
        handleCartProductQuantity,
        userData,
        setUserData,
        isLogin,
        setIsLogin,
        userCart,
        setUserCart,
        orders,
        setOrders,
        users,
        setUsers,
        userLogin,
        idUser,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default AppContext