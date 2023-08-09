import React, { useEffect, useState } from 'react';
import './Order.scss';
import { getOrderUser } from '../../../utils/api';

const Order = () => {
  const [productOrder, setProductOrder] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.user.id;
  console.log(userId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getOrderUser(`/api/orders?filters[userId]=${userId}`);
        console.log(response.data);
        setProductOrder(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserData();
  }, [userId]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  console.log(productOrder);

  return (
    <div className='order'>
      <h1>Order</h1>
      <div className='order-content'>
        <div className='order-content-title'>
          <table>
            <thead>
              <tr>
                <th>Img</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Total</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {productOrder.data && productOrder.data.map((product) => (
                <tr key={product.id}>
                  <td className='td-img'><img src={process.env.REACT_APP_DEV_URL + product.attributes.products[0].attributes.ProductImg.data[0].attributes.url}></img></td>
                  <td>{product.attributes.products[0].attributes.ProductName}</td>
                  <td>{product.attributes.products[0].attributes.ProductPrice}</td> 
                  <td>{product.attributes.products[0].attributes.qty}</td>
                  <td className={product.attributes.status}>{product.attributes.status}</td>
                  <td>{product.attributes.products[0].attributes.ProductPrice * product.attributes.products[0].attributes.qty}</td>
                  <td>{formatDate(product.attributes.publishedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;