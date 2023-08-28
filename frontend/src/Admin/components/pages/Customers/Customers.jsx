import React, { useState, useContext } from 'react'
import './Customers.scss'
import { MdDelete} from 'react-icons/md'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { Context } from '../../../../utils/AppContext'
import { BsEyeFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../../../../utils/api'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customers = () => {
    const { users } = useContext(Context)

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage, setOrdersPerPage] = useState(10) // Số lượng sản phẩm hiển thị trên mỗi trang

    // Tính chỉ số bắt đầu và kết thúc của danh sách sản phẩm hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * ordersPerPage
    const endIndex = startIndex + ordersPerPage
    const currentOrders = users?.slice(startIndex, endIndex)

    const totalPages = Math.ceil(users?.length / ordersPerPage);

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

    const handleViewUser = (Id) => {
        navigate(`/admin/customers/details/${Id}`)
    }

    const handleDele = async (Id) => {
        try {
            const response = await fetchData.delete(`/api/users/${Id}`)
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
            toast.error('Detele Error', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    return (
        <div className='admin-customers'>
            <div className="admin-customers-title">
                <h3>Customers</h3>
            </div>
            <div className="toast-container"><ToastContainer limit={2} /></div>
            <div className="admin-customers-content">
                <div className="admin-customers-content-list">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    <label>Full Name</label>
                                </th>
                                <th>
                                    <label>Email</label>
                                </th>
                                <th>
                                    <label>Status</label>
                                </th>
                                <th>
                                    <label>Created At</label>
                                </th>
                                <th>
                                    <label>Role</label>
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
                                    <input type='text' placeholder='Full Name'></input>
                                </th>
                                <th>
                                    <input type='text' placeholder='Email'></input>
                                </th>
                                <th>
                                    <select>
                                        <option>All</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </th>
                                <th>
                                    <input type='text' placeholder='Created At'></input>
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
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders && currentOrders.map((orders) => (
                                <tr key={orders.id}>
                                    <td><input type='checkbox' value={orders.id} onChange={(e) => console.log(e.target.value)}></input></td>
                                    <td>{orders.username}</td>
                                    <td>{orders.email}</td>
                                    <td className='product-status'>
                                        {orders.blocked ? <span className='product-status-false'><GrStatusGoodSmall /></span> : <span ><GrStatusGoodSmall className='product-status-true' /></span>}
                                    </td>
                                    <td>{formatDate(orders.createdAt)}</td>
                                    <td className='orders-total'>{orders.role.name}</td>
                                    <td className='orders-actions'>
                                        <span><BsEyeFill className='icon action-eye' onClick={() => handleViewUser(orders.id)} /></span>
                                        <span><MdDelete className='icon action-dele' onClick={() => handleDele(orders.id)} /></span>
                                    </td>
                                </tr>
                            ))}

                            <div className="current-page-number">
                                <div className="number-customers-page">
                                    <h4>Show</h4>
                                    <input
                                        type="number"
                                        min={10}
                                        max={users?.length}
                                        value={ordersPerPage}
                                        onChange={handleNumberPageChange}
                                    />
                                    <h4>customer page</h4>
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
                                    <div className="number-customers-total">
                                        <h4>Total: <span>{users?.length}</span> Customers</h4>
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

export default Customers