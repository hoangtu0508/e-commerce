import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsEyeFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import './Overview.scss'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'

const Overview = () => {
    const [order, setOrder] = useState()
    const { id } = useParams()

    useEffect(() => {
        handleGetOrder();
    }, [id])

    const token = JSON.parse(localStorage.getItem('user'));
    const jwt = token?.jwt;
    const navigate = useNavigate()

    const formatDateMonth = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

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

    const handleViewOrder = (Id) => {
        navigate(`/admin/orders/order-view/${Id}`)
    }

    const handleDeleOrder = async (Id) => {
        try {
            const response = await axios.delete(`http://localhost:1337/api/orders/${Id}`, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                }
            })
            window.location.reload()
        } catch (error) {

        }
    }

    return (
        <div className='over-view'>
            <div className="over-view-header">
                <div className="form account-balance">
                    <span><BiMoneyWithdraw className='icon money'/></span>
                    <h2>Account Balance</h2>
                    <h3><b>$3000</b> Credit Left</h3>
                    <p>Account balance for next purchase</p>
                </div>
                <div className="form wish-list">
                    <span><AiFillHeart className='icon heart'/></span>
                    <h2>Wishlist</h2>
                    <h3><b>20</b> Items in wishlist</h3>
                    <p>Receive notification when items go on sale</p>
                </div>
            </div>
            <div className="form list-order-customer">
                <h3>List Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th><input type='checkbox'></input></th>
                            <th><label>ORDER</label></th>
                            <th><label>DATE</label></th>
                            <th><label>STATUS</label></th>
                            <th><label>SPENT</label></th>
                            <th><label>ACTION</label></th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.data.map((item) => (
                            <tr key={item.id}>
                                <td><input type='checkbox'></input></td>
                                <td>{item.attributes.stripeId.slice(0, 18)}</td>
                                <td>{formatDateMonth(item.attributes.createdAt)}</td>
                                <td><label className={item.attributes.status_order.data.attributes.StatusName}>{item.attributes.status_order.data.attributes.StatusName}</label></td>
                                <td>${item?.attributes.products.reduce((acc, item) => {
                                    return acc + item.attributes.ProductPrice * item.attributes.qty
                                }, 0)}</td>
                                <td className='action'>
                                    <span><BsEyeFill className='icon action-eye' onClick={() => handleViewOrder(item.id)} /></span>
                                    <span><MdDelete className='icon action-dele' onClick={() => handleDeleOrder(item.id)} /></span>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Overview