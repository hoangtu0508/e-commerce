import React, { useEffect } from 'react'
import Header from './components/Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import SliderBar from './components/SliderBar/SliderBar'
import './AdminLayout.scss'

const AdminLayout = () => {
const navigate = useNavigate()
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') ==="true";
    if(!isAdmin) {
      navigate('/')
    } 
    
  },[navigate])
  return (
    <>
      <Header />
      <div className='admin-layout'>
        <div className='admin-layout-slider-bar'>
          <SliderBar />
        </div>
        <div className='admin-layout-main'>
          <Outlet />
          
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default AdminLayout