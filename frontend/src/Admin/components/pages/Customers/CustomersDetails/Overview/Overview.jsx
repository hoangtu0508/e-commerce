import React, { useEffect, useState } from 'react'
import { BsEyeFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import './Overview.scss'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { fetchData } from '../../../../../../utils/api'

const Overview = () => {
    const [order, setOrder] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(5) // Số lượng sản phẩm hiển thị trên mỗi trang

    // Tính chỉ số bắt đầu và kết thúc của danh sách sản phẩm hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    const currentProducts = order?.data.slice(startIndex, endIndex)

    const totalPages = Math.ceil(order?.data.length / productsPerPage)

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
        setProductsPerPage(productNumber)
    }

    useEffect(() => {
        handleGetOrder();
    }, [id])

    const formatDateMonth = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleGetOrder = async () => {
        try {
            const response = await fetchData.get(`/api/orders?filters[userId]=${id}&populate=*`)
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
            const response = await fetchData.delete(`/api/orders/${Id}`)
            window.location.reload()
        } catch (error) {

        }
    }

    return (
        <div className='over-view'>
            <div className="over-view-header">
                <div className="form account-balance">
                    <span><BiMoneyWithdraw className='icon money' /></span>
                    <h2>Account Balance</h2>
                    <h3><b>$3000</b> Credit Left</h3>
                    <p>Account balance for next purchase</p>
                </div>
                <div className="form wish-list">
                    <span><AiFillHeart className='icon heart' /></span>
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
                        {currentProducts?.map((item) => (
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
                <div className="current-page-number">
                    <div className="number-product-page">
                        <h4>Show</h4>
                        <input
                            type="number"
                            min={10}
                            max={order?.length}
                            value={productsPerPage}
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
                            <h4>Total: <span>{order?.data.length}</span> Order</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview