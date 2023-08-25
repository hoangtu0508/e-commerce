import React, { useEffect, useState } from 'react'
import './OrderDetail.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetail = () => {
    const [orderDetail, setOrderDetail] = useState()
    const [statusOrder, setStatusOrder] = useState()
    const [inputStatus, setInputStatus] = useState()
    const customer = orderDetail?.data.attributes.user
    const statusOrderId = orderDetail?.data.attributes.status_order.data?.id

    const token = JSON.parse(localStorage.getItem('user'));
    const jwt = token?.jwt;

    console.log(statusOrderId);

    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getOrderId();
        getStatusOrder();
    }, [id])
    const getOrderId = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/orders/${id}?populate=*`, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                }
            })
            setOrderDetail(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getStatusOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/status-orders`, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                }
            })
            setStatusOrder(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                `http://localhost:1337/api/orders/${id}?populate=*`,
                {
                    data: {
                        status_order: {
                            set: [inputStatus]
                        }
                    }
                },
                {
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            setTimeout(() => {
                window.location.reload()
            }, [1000])
            const message = ("Upload Success")
            toast.success(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, //3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide
            })

        } catch (error) {
            toast.error('Upload Error', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const handleDeleOrder = async () => {
        try {
            const response = await axios.delete(`http://localhost:1337/api/orders/${id}`, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                }
            })
            setTimeout(() => {
                window.location.reload()
                navigate('/admin/orders')
            }, [1000])
            const message = ("Delete Success")
            toast.success(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, //3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide
            })
        } catch (error) {
            toast.error('Delete Error', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const totalPrice = orderDetail?.data.attributes.products.reduce((acc, item) => {
        return acc + item.attributes.ProductPrice * item.attributes.qty;
    }, 0);
    return (
        <div className='order-detail'>
            <div className="order-detail-title">
                <div className="title-back">
                    <Link to="/admin/orders"><BiArrowBack className='icon-back' /></Link>
                    <h2>Order Details</h2>
                </div>
                <div className="btn-dele">
                    <Link onClick={handleDeleOrder}>Delete Order</Link>
                </div>
            </div>
            <div className="toast-container"><ToastContainer limit={2} /></div>
            <div className="order-code">
                <div className="order-code-title">
                    <h3>Order: #{orderDetail?.data?.id}</h3>
                    <label className={orderDetail?.data?.attributes?.status_order?.data?.attributes?.StatusName}>{orderDetail?.data?.attributes?.status_order?.data?.attributes?.StatusName}</label>
                </div>
                <h4>ID Payment: {orderDetail?.data?.attributes.stripeId.slice(0, 25)}</h4>
                <label>{formatDate(orderDetail?.data?.attributes.createdAt)}</label>
            </div>

            <div className="order-detail-form">
                <div className="form-content">
                    <div className="form-left">
                        <div className="form left-order-detail">
                            <div className="form-header">
                                <h3>Order Details</h3>
                                <Link>Edit</Link>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type='checkbox'></input></th>
                                        <th>
                                            <label>PRODUCTS</label>
                                        </th>
                                        <th>
                                            <label>PRICE</label>
                                        </th>
                                        <th>
                                            <label>QTY</label>
                                        </th>
                                        <th>
                                            <label>TOTAL</label>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetail?.data.attributes.products.map((products) => (
                                        <tr key={products.id}>
                                            <td><input type='checkbox'></input></td>
                                            <td>
                                                <div className="product-detail">
                                                    <img src={process.env.REACT_APP_DEV_URL + products.attributes.ProductImg.data[0].attributes.url}></img>
                                                    <div className="product-content">
                                                        <h5>{products.attributes.ProductName}</h5>
                                                        <label>{products.attributes?.category?.data?.attributes?.CategoryName}</label>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{products.attributes.ProductPrice}</td>
                                            <td>{products.attributes.qty}</td>
                                            <td>{products.attributes.ProductPrice * products.attributes.qty}</td>
                                        </tr>
                                    ))}

                                    <div className="order-subtotal">
                                        <h4>Subtotal:</h4><h2>${totalPrice}</h2>
                                    </div>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="form-right">
                        <div className="form right-customer-dettail">
                            <div className="form-header">
                                <h3>Customer Details</h3>
                                <Link>Edit</Link>
                            </div>
                            <div className="customer-info">
                                <img src='https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png'></img>
                                <div className="profile">
                                    <h3>{customer?.username}</h3>
                                    <label>Customer ID: {customer?.id}</label>
                                </div>
                            </div>

                            <div className="customer-cart">
                                <span><AiOutlineShoppingCart className='cart-icon' /></span>
                                <label>{12} orders</label>
                            </div>

                            <div className="contact-info">
                                <h3>Contact info</h3>
                                <p>Email: {customer?.email}</p>
                                <p>Phone: {customer?.phone}</p>
                            </div>
                        </div>

                        <div className="form status-order">
                            <h3>Status Order</h3>
                            <div className="choose-status-order">
                                <label>Choose status: </label>
                                <form onSubmit={handleSubmit}>
                                    <select
                                        name="categories"
                                        value={statusOrder?.data?.id}
                                        onChange={(e) => setInputStatus(e.target.value)}
                                        required
                                        className="categories-select"
                                    >
                                        {statusOrder?.data?.map((status) => (
                                            <option key={status.id} value={status.id} selected={status.id === statusOrderId} >
                                                {status.attributes.StatusName}
                                            </option>
                                        ))}
                                    </select>
                                    <input type='submit' onClick={handleSubmit}></input>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail