import React, { useEffect, useState } from 'react'
import './CustomersDetails.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack, BiLockAlt, BiMoneyWithdraw } from 'react-icons/bi'
import axios from 'axios'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Overview from './Overview/Overview'
import Security from './Security/Security'
import Address from './Address/Address'
import { CgProfile } from 'react-icons/cg'
import { FiFileText } from 'react-icons/fi'
import Modal from '@mui/joy/Modal/Modal'
import ModalDialog from '@mui/joy/ModalDialog/ModalDialog';
import ModalClose from '@mui/joy/ModalClose/ModalClose';
import EditProfile from './EditProfile/EditProfile'

const CustomersDetails = () => {
  const [userDetails, setUserDetails] = useState()
  const [order, setOrder] = useState()

  const [activeComponent, setActiveComponent] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const showComponent = (componentNumber) => {
    setActiveComponent(componentNumber);
  };

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    getUserDetails();
    handleGetOrder()
  }, [id])

  const token = JSON.parse(localStorage.getItem('user'));
  const jwt = token?.jwt;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };


  const getUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/users/${id}?populate=*`, {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        }
      })
      setUserDetails(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDele = async (Id) => {
    try {
      const response = await axios.delete(`http://localhost:1337/api/users/${Id}`, {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        }
      })
      navigate('/admin/customers')
      window.location.reload()
    } catch (error) {

    }
  }

  const handleGetOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/orders?filters[userId]=${id}&populate=*`, {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        }
      })
      setOrder(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const calculateTotalRevenue = () => {
    let totalRevenue = 0;

    if (order?.data?.length > 0) {
      order?.data?.map((order) => {
        const products = order?.attributes.products
        if (products.length > 0) {
          products?.map((item) => {
            const productPrice = item.attributes.ProductPrice;
            const quantity = item.attributes.qty;
            const revenue = productPrice * quantity;
            totalRevenue += revenue;
          }
          )
        }
      });
    }
    return totalRevenue;
  };

  // const handleViewOrder = (Id) => {
  //   navigate(`/admin/orders/order-view/${Id}`)
  // }

  // const handleDeleOrder = async (Id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:1337/api/orders/${Id}`, {
  //       mode: 'no-cors',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${jwt}`,
  //       }
  //     })
  //     window.location.reload()
  //   } catch (error) {

  //   }
  // }

  console.log(order);
  return (
    <div className='customers-details'>
      <div className="modal">
        <Modal
          open={isModalOpen}
          onClose={() => handleModalClose()}
          maxWidth="lg" PaperProps={{ style: { width: '800px'} }}
        >
          <ModalDialog>
            <ModalClose />
            <EditProfile />
          </ModalDialog>
        </Modal>
      </div >
      <div className='customers-details-title'>
        <Link to="/admin/orders"><BiArrowBack className='icon-back' /></Link>
        <h2>Order Details</h2>
      </div>
      <div className="customers-details-header">
        <div className="form header-title">
          <div className="header-title-left">
            <h3>Customer ID: #{userDetails?.id}</h3>
            <label>{formatDate(userDetails?.createdAt)}</label>
          </div>

          <div className="header-btn-dele">
            <Link onClick={handleDele}>Delete Customer</Link>
          </div>
        </div>

        <div className="customers-content">
          <div className="form content-left">
            <div className="customer-info">
              <img src={process.env.REACT_APP_DEV_URL + userDetails?.AvatarUser[0].url}></img>
              <h2>{userDetails?.username}</h2>
              <label>Customer ID: #{userDetails?.id}</label>
            </div>
            <div className="customer-order">
              <div className="customer cart">
                <span><AiOutlineShoppingCart className='icon cart-icon' /></span>
                <div className="customer-cart title">
                  <h3>{order?.data?.length}</h3>
                  <h4>Orders</h4>
                </div>
              </div>
              <div className="customer order-total">
                <span><BiMoneyWithdraw className='icon total-icon' /></span>
                <div className="customer-order-total title">
                  <h3>${calculateTotalRevenue()}</h3>
                  <h4>Spent</h4>
                </div>
              </div>
            </div>

            <div className="customer-details">
              <h3>DETAILS</h3>
              <h4>Username: <label>{userDetails?.username}</label></h4>
              <h4>Email: <label>{userDetails?.email}</label></h4>
              <h4>Status: {userDetails?.blocked ? (<label className='passive'>Passive</label>) : (<label className='active'>Active</label>)}</h4>
              <h4>Contact: <label>{userDetails?.phone}</label></h4>
              <div className="btn-edit">
                <input type='submit' value='Edit Details' onClick={handleEditClick}></input>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="button-container">
              <Link className={`button ${activeComponent === 1 ? 'active' : ''}`} onClick={() => showComponent(1)}><CgProfile className='icon' /> Overview</Link>
              <Link className={`button ${activeComponent === 2 ? 'active' : ''}`} onClick={() => showComponent(2)}><BiLockAlt className='icon' /> Security</Link>
              <Link className={`button ${activeComponent === 3 ? 'active' : ''}`} onClick={() => showComponent(3)}><FiFileText className='icon' /> Address & Billing</Link>
            </div>

            {activeComponent === 1 && <Overview />}
            {activeComponent === 2 && <Security />}
            {activeComponent === 3 && <Address />}
          </div>
        </div>
      </div>
    </div >
  )
}

export default CustomersDetails