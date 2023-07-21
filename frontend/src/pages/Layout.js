import React from 'react'
import Nav from '../conponents/Header/Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../conponents/Footer/Footer'

const Layout = () => {
  return (
    <div className='App'>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout