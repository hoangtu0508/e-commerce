import React,{useContext, useEffect} from 'react'
import Nav from '../conponents/Header/Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../conponents/Footer/Footer'
import { fetchDataFromApi } from '../utils/api'
import { Context } from '../utils/AppContext'

const Layout = () => {
  const { categories, setCategories, products, setProducts } = useContext(Context);
  useEffect(() => {
    getCategories();
    getProducts()
  }, [])

  const getCategories = () => {
    fetchDataFromApi("/api/categories").then(res => {
      console.log(res)
      setCategories(res)
    })
  }

  const getProducts = () => {
    fetchDataFromApi("/api/products").then(res => {
      console.log(res)
      setProducts(res)
    })
  }
  return (


    <div className='App'>
      <Nav categories={categories}/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout