import React, { useContext, useState } from 'react'
import './Orders.scss'
import { MdDelete } from 'react-icons/md'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { Context } from '../../../../utils/AppContext'
import { BsEyeFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from '../../../../utils/api'

const Orders = () => {
  const navigate = useNavigate()

  const { orders } = useContext(Context)

  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage, setOrdersPerPage] = useState(10) // Số lượng sản phẩm hiển thị trên mỗi trang

  // Tính chỉ số bắt đầu và kết thúc của danh sách sản phẩm hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const currentOrders = orders?.slice(startIndex, endIndex)

  const totalPages = Math.ceil(orders?.length / ordersPerPage);

  const next = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage)
  }
  const prev = () => {
    const prevPage = currentPage - 1
    setCurrentPage(prevPage)
  }

  const handlePageChange = (e) => {
    const pageNumber = parseInt(e.target.value)
    setCurrentPage(pageNumber)
  }

  const handleNumberPageChange = (e) => {
    const productNumber = parseInt(e.target.value)
    setOrdersPerPage(productNumber)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDeleOrder = async (Id) => {
    try {
      const response = await fetchData.delete(`/api/orders/${Id}`)
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
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      toast.error('Delete Error', {
        position: toast.POSITION.TOP_RIGHT,
    });
    }
  }
  const handleViewOrder = (Id) => {
    // Điều hướng đến trang chỉnh sửa sản phẩm với productId
    navigate(`./order-view/${Id}`);
  };

  return (
    <div className='admin-orders'>
      <div className="admin-orders-title">
        <h3>Orders</h3>
      </div>
      <div className="toast-container"><ToastContainer limit={2} /></div>
      <div className="admin-orders-content">
        <div className="admin-orders-content-list">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  <label>Order Code</label>
                </th>
                <th>
                  <label>Date</label>
                </th>
                <th>
                  <label>Customer Email</label>
                </th>
                <th>
                  <label>Status</label>
                </th>
                <th>
                  <label>Total</label>
                </th>
                <th>
                  <label>Actions</label>
                </th>
              </tr>

              <tr>
                <th>
                  <input type='checkbox' className='checkbox'></input>
                </th>
                <th>
                  <input type='text' placeholder='Order Code'></input>
                </th>
                <th>
                  <div className="input-date">
                    <input type='number' placeholder='From'></input>
                    <input type='number' placeholder='To'></input>
                  </div>
                </th>
                <th>
                  <input type='text' placeholder='Customer Email'></input>
                </th>
                <th>
                  <select>
                    <option>All</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </th>
                <th>

                </th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders && currentOrders.map((orders) => (
                <tr key={orders.id}>
                  <td><input type='checkbox' value={orders.id} onChange={(e) => console.log(e.target.value)}></input></td>
                  <td>{orders.attributes.stripeId.slice(0, 20)}</td>
                  <td>{formatDate(orders.attributes.createdAt)}</td>
                  <td>{orders?.attributes.user?.email}</td>
                  <td className={orders.attributes.status_order?.data?.attributes?.StatusName}>
                    <label>{orders.attributes.status_order?.data?.attributes?.StatusName}</label>
                  </td>
                  <td className='orders-total'>
                    {orders?.attributes.products.reduce((acc, item) => {
                      return acc + item.attributes.ProductPrice * item.attributes.qty
                    }, 0)}
                  </td>
                  <td className='orders-actions'>
                    <span><BsEyeFill className='icon action-eye' onClick={() => handleViewOrder(orders.id)} /></span>
                    <span><MdDelete className='icon action-dele' onClick={() => handleDeleOrder(orders.id)} /></span>
                  </td>
                </tr>
              ))}

              <div className="current-page-number">
                <div className="number-orders-page">
                  <h4>Show</h4>
                  <input
                    type="number"
                    min={10}
                    max={orders?.length}
                    value={ordersPerPage}
                    onChange={handleNumberPageChange}
                  />
                  <h4>order page</h4>
                </div>

                <div className="pagination-info">
                  <div onClick={prev} className='icon'><GrPrevious className='icon-prev' /></div>
                  <div className="page-number">
                    <span>1</span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={handlePageChange}
                    />
                    <span>{totalPages}</span>
                  </div>
                  <div onClick={next} className='icon'><GrNext className='icon-next' /></div>
                  <div className="number-product-total">
                    <h4>Total: <span>{orders?.length}</span> Orders</h4>
                  </div>
                </div>
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders