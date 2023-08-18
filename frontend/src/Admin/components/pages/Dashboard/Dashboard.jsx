import React, { useEffect, useState } from "react";
import axios from "axios";
import { getData } from "../../../../utils/api";
import './Dashboard.scss'
import { CiMoneyCheck1 } from 'react-icons/ci'
import { BsFillBoxFill } from 'react-icons/bs'
import { BiSolidBox } from 'react-icons/bi'
import { Bar } from "react-chartjs-2";
import Charts from "./Charts/Charts";
import ChartPie from "./Charts/ChartPie";
import { MdDelete, MdArrowBackIosNew } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { BsEyeFill } from 'react-icons/bs'

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchDataOrder();
    fetchDataProduct();
  }, []);



  const fetchDataOrder = async () => {
    try {
      const response = await getData.get("/api/orders");
      const data = response.data;
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const calculateTotalRevenue = () => {
    let totalRevenue = 0;

    if (orders.data?.length > 0) {
      orders.data.map((order) => {
        const productPrice = order.attributes.products[0].attributes.ProductPrice;
        const quantity = order.attributes.products[0].attributes.qty;
        const revenue = productPrice * quantity;
        console.log('move')
        totalRevenue += revenue;
      });
    }

    return totalRevenue;
  };

  const fetchDataProduct = async () => {
    try {
      const response = await getData.get("/api/products");
      const data = response.data;
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };



  console.log(products)

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-content">
        <div className="dashboard-items dashboard-total-revenue">
          {isLoading ? (
            <p>Loading statistics...</p>
          ) : (
            <div className="content total-revenue-content">
              <h3>TOTAL REVENUE</h3>
              <p><CiMoneyCheck1 className="content-icon" />{calculateTotalRevenue()}$</p>
              {/* Hiển thị biểu đồ hoặc bảng thống kê doanh thu */}
            </div>
          )}
        </div>

        <div className="dashboard-items dashboard-total-order">
          {isLoading ? (
            <p>Loading orders...</p>
          ) : (
            <div className="content total-order-content">
              <h3>TOTAL ORDER</h3>
              <p><BsFillBoxFill className="content-icon" />{orders.data?.length}</p>
            </div>
          )

          }
        </div>

        <div className="dashboard-items dashboard-total-products">
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <div className="content total-products-content">
              <h3>TOTAL PRODUCT</h3>
              <p><BiSolidBox className="content-icon" />{products?.data?.length}</p>
            </div>
          )

          }
        </div>

      </div>
      <div className="charts">
        <div className="chart-title chart-col">
          <h3>MONTHLY STATISTICS</h3>
          <Charts orders={orders} />
        </div>

        <div className="chart-title chart-pie">
          <h3>STATISTICS BY PRODUCTS CATEGORIES</h3>
          <ChartPie orders={orders} />
        </div>
      </div>

      <div className="list-order">
        <h3>Order News</h3>
        <div className="list-order-content">
          <table>
            <thead>
              <tr>
                <input type="checkbox"></input>
                <th>Img</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Total</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.data && orders.data.slice(0, 5).map((product) => (
                <tr key={product.id}>
                  <input type="checkbox"></input>
                  <td className='td-img'><img src={process.env.REACT_APP_DEV_URL + product.attributes.products[0].attributes.ProductImg.data[0].attributes.url}></img></td>
                  <td>{product.attributes.products[0].attributes.ProductName}</td>
                  <td>{product.attributes.products[0].attributes.ProductPrice}</td>
                  <td>{product.attributes.products[0].attributes.qty}</td>
                  <td className={product.attributes.status}>{product.attributes.status}</td>
                  <td>{product.attributes.products[0].attributes.ProductPrice * product.attributes.products[0].attributes.qty}</td>
                  <td>{formatDate(product.attributes.publishedAt)}</td>
                  <td className='orders-actions'>
                    <span><BsEyeFill className='icon action-eye' /></span>
                    <span><AiFillEdit className='icon action-edit' /></span>
                    <span><MdDelete className='icon action-dele' /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;