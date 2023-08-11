import React from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import SliderBar from './components/SliderBar/SliderBar'
import './AdminLayout.scss'

const AdminLayout = () => {
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
      <Footer />
    </>
  )
}

export default AdminLayout