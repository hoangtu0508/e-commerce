import React, {useEffect, useState} from 'react'
import './Order.scss'
import { fetchDataFromApi } from '../../../utils/api';

const Order = () => {
    const [productOrder, setProductOrder] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.user.id
    useEffect(() => {
        // Lấy thông tin người dùng hiện tại từ API của Strapi và cập nhật state
        const fetchUserData = async () => {
          try {
            const response = await fetchDataFromApi.get(`/api/orders/&[filters][id]=${id}`); // Thay đổi URL tương ứng với API của Strapi
            setProductOrder(response.data);
          } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
          }
        };
    
        fetchUserData();
      }, []);
  return (
    <div className='order'>
        <h1>Order</h1>
        <div className='order-content'>

        </div>
    </div>
  )
}

export default Order