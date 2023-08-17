import React, { useContext, useState } from 'react'
import './Products.scss'
import { Link } from 'react-router-dom'
import { Context } from '../../../../utils/AppContext'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdDelete, MdArrowBackIosNew } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { GrNext, GrPrevious } from 'react-icons/gr'

const Products = () => {
  const { products } = useContext(Context)

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10) // Số lượng sản phẩm hiển thị trên mỗi trang

  // Tính chỉ số bắt đầu và kết thúc của danh sách sản phẩm hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  const totalPages = Math.ceil(products.length / productsPerPage)

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

  return (
    <div className='admin-products'>
      <div className="admin-products-title">
        <h3>Products</h3>
        <div className='btn-products-new'>
          <Link to="new-product">New Product</Link>
        </div>
      </div>

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
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </th>
                <th><label>Actions</label></th>
              </tr>
            </thead>
            <tbody>
              {currentProducts && currentProducts.map((product) => (
                <tr key={product.id}>
                  <td><input type='checkbox' value={product.id} onChange={(e) => console.log(e.target.value)}></input></td>
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
                    <span><AiFillEdit className='icon action-edit' /></span>
                    <span><MdDelete className='icon action-dele' /></span>
                  </td>
                </tr>
              ))}

              <div className="current-page-number">
                <div className="number-product-page">
                  <h4>Show</h4>
                  <input
                      type="number"
                      min={10}
                      max={products.length}
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
                    <h4>Total: <span>{products.length}</span> Product</h4>
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