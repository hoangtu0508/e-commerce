import React, { useContext, useEffect } from 'react'
import Nav from '../conponents/Header/Nav/Nav'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../conponents/Footer/Footer'
import { fetchDataFromApi, getUserProfile } from '../utils/api'
import { Context } from '../utils/AppContext'
import { getUser, userData } from '../utils/helpers';

const Layout = () => {
  const navigate = useNavigate()

  const { jwt } = userData();
  const isLoggedIn = !!jwt

  return (
    <div className='App'>
      <Nav basketItems={0} isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout