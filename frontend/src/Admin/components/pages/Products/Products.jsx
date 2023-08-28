import React, { useContext, useState } from 'react'
import './Products.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../../../utils/AppContext'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdDelete, MdArrowBackIosNew } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { GrNext, GrPrevious } from 'react-icons/gr'
import axios from 'axios'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from '../../../../utils/api'

const Products = () => {
  const { products } = useContext(Context)
  const [productId, setProductId] = useState(null)

  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10) // Số lượng sản phẩm hiển thị trên mỗi trang

  // Tính chỉ số bắt đầu và kết thúc của danh sách sản phẩm hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = products?.slice(startIndex, endIndex)

  const totalPages = Math.ceil(products?.length / productsPerPage)

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

  const handleDeleProduct = async (Id) => {
    try {
      const response = await fetchData.delete(`/api/products/${Id}`)
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

  const handleEditProduct = (productId) => {
    // Điều hướng đến trang chỉnh sửa sản phẩm với productId
    navigate(`./edit-product/${productId}`);
  };

  return (
    <div className='admin-products'>
      <div className="admin-products-title">
        <h3>Products</h3>
        <div className='btn-products-new'>
          <Link to="new-product">New Product</Link>
        </div>
      </div>
      <div className="toast-container"><ToastContainer limit={2} /></div>
      <div className="admin-products-content">
        <div className="admin-products-content-list">
          <table>
            <thead>
              <tr>
                <th>
                  <span></span><br />
                  <input type='checkbox' className='checkbox'></input>
                </th>
                <th><label>Img</label></th>
                <th><label>Name</label><input type='text' placeholder='Product Name'></input></th>
                <th>
                  <label>Price</label>
                  <div className='input-price'>
                    <input type='text' placeholder='From' />
                    <input type='text' placeholder='To' />
                  </div>
                </th>
                <th>
                  <label>Quantity</label>
                  <div className='input-price'>
                    <input type='text' placeholder='From' />
                    <input type='text' placeholder='To' />
                  </div>
                </th>
                <th>
                  <label>Status</label>
                  <select>
                    <option>All</option>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </th>
                <th><label>Actions</label></th>
              </tr>
            </thead>
            <tbody>
              {currentProducts && currentProducts.map((product) => (
                <tr key={product.id}>
                  <td><input type='checkbox' value={product.id} onChange={(e) => setProductId(parseInt(e.target.value))}></input></td>
                  <td className='td-img'><img src={process.env.REACT_APP_DEV_URL + product.attributes.ProductImg.data[0].attributes.url}></img></td>
                  <td>{product.attributes.ProductName}</td>
                  <td>${product.attributes.ProductPrice}</td>
                  <td>{product.attributes.ProductQuantity}</td>
                  <td className={product.attributes.ProductStatus}>
                    <div className="product-status">
                      {product.attributes.ProductStatus ? <span className='product-status-true'><GrStatusGoodSmall /></span> : <span ><GrStatusGoodSmall className='product-status-false' /></span>}
                    </div>
                  </td>
                  <td className='product-actions'>
                    <span><AiFillEdit className='icon action-edit' onClick={() => handleEditProduct(product.id)} /></span>
                    <span><MdDelete className='icon action-dele' value={product.id} onClick={() => handleDeleProduct(product.id)} /></span>
                  </td>
                </tr>
              ))}

              <div className="current-page-number">
                <div className="number-product-page">
                  <h4>Show</h4>
                  <input
                    type="number"
                    min={10}
                    max={products?.length}
                    value={productsPerPage}
                    onChange={handleNumberPageChange}
                  />
                  <h4>product page</h4>
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
                    <h4>Total: <span>{products?.length}</span> Product</h4>
                  </div>
                </div>
              </div>
            </tbody>
          </table>
        </div>
      </div>

    </div >
  )
}

export default Products