import React, { useContext, useEffect } from 'react'
import Nav from '../conponents/Header/Nav/Nav'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../conponents/Footer/Footer'
import { fetchDataFromApi, getUserProfile } from '../utils/api'
import { Context } from '../utils/AppContext'
import { getUser, userData } from '../utils/helpers';

const Layout = () => {
  const navigate = useNavigate()
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


  const { jwt } = userData();
  const isLoggedIn = !!jwt
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if(isAdmin) {
      navigate('/admin')
    } 
    
  },[navigate])
  return (


    <div className='App'>
      <Nav basketItems={0} isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout