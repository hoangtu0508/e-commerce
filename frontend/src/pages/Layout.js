import React, { useContext, useEffect } from 'react'
import Nav from '../conponents/Header/Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../conponents/Footer/Footer'
import { fetchDataFromApi } from '../utils/api'
import { Context } from '../utils/AppContext'

const Layout = () => {

  const { products, setProducts, categories, setCategories } = useContext(Context);
  console.log(products)
  useEffect(() => {
    getProducts();
    getCategories();
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
  return (


    <div className='App'>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout