import React from "react";
import { fetchData} from "../../../../utils/api";
import './Dashboard.scss'
import { CiMoneyCheck1 } from 'react-icons/ci'
import { BsFillBoxFill } from 'react-icons/bs'
import { BiSolidBox } from 'react-icons/bi'
import Charts from "./Charts/Charts";
import ChartPie from "./Charts/ChartPie";
import { MdDelete} from 'react-icons/md'
import { BsEyeFill } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../../utils/AppContext";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  const navigate = useNavigate()

  const {products, orders} = useContext(Context)

  const calculateTotalRevenue = () => {
    let totalRevenue = 0;

    if (orders.length > 0) {
      orders?.map((order) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDeleOrder = async (Id) => {
    try {
      const response = await fetchData.delete(`/api/orders/${Id}`)
      setTimeout(() => {
        window.location.reload()
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
  const handleViewOrder = (Id) => {
    // Điều hướng đến trang chỉnh sửa sản phẩm với productId
    navigate(`orders/order-view/${Id}`);
  };


  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="toast-container"><ToastContainer limit={2} /></div>
      <div className="dashboard-content">
        <div className="dashboard-items dashboard-total-revenue">
          {!orders ? (
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
          {!orders ? (
            <p>Loading orders...</p>
          ) : (
            <div className="content total-order-content">
              <h3>TOTAL ORDER</h3>
              <p><BsFillBoxFill className="content-icon" />{orders.length}</p>
            </div>
          )

          }
        </div>

        <div className="dashboard-items dashboard-total-products">
          {!products ? (
            <p>Loading products...</p>
          ) : (
            <div className="content total-products-content">
              <h3>TOTAL PRODUCT</h3>
              <p><BiSolidBox className="content-icon" />{products?.length}</p>
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
              {orders && orders.slice(0, 5).map((product) => (
                <tr key={product.id}>
                  <input type="checkbox"></input>
                  <td className='td-img'><img src={process.env.REACT_APP_DEV_URL + product.attributes.products[0].attributes.ProductImg.data[0].attributes.url}></img></td>
                  <td>{product.attributes.products[0].attributes.ProductName}</td>
                  <td>{product.attributes.products[0].attributes.ProductPrice}</td>
                  <td>{product.attributes.products[0].attributes.qty}</td>
                  <td className={product?.attributes?.status_order?.data?.attributes?.StatusName}>{product?.attributes?.status_order?.data?.attributes?.StatusName}</td>
                  <td>
                  {product?.attributes.products.reduce((acc, item) => {
                      return acc + item.attributes.ProductPrice * item.attributes.qty}, 0)}
                  </td>
                  <td>{formatDate(product.attributes.publishedAt)}</td>
                  <td className='orders-actions'>
                    <span><BsEyeFill className='icon action-eye' onClick={() => handleViewOrder(product.id)}/></span>
                    <span><MdDelete className='icon action-dele' onClick={() => handleDeleOrder(product.id)}/></span>
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