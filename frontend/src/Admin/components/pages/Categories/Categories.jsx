import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Categories.scss'
import { Context } from '../../../../utils/AppContext'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from '../../../../utils/api'

const Categories = () => {
  const { categories } = useContext(Context)

  const [currentPage, setCurrentPage] = useState(1)
  const [categoriesPerPage, setCategoriesPerPage] = useState(10)

  const startIndex = (currentPage - 1) * categoriesPerPage
  const endIndex = startIndex + categoriesPerPage
  const currentCategories = categories?.slice(startIndex, endIndex)

  const totalPages = Math.ceil(categories?.length / categoriesPerPage)
  const navigate = useNavigate()
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
    setCategoriesPerPage(productNumber)
  }

  const handleDeleCategory = async (Id) => {
    try {
      const response = await fetchData.delete(`/api/categories/${Id}`)
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

  const handleEditCategory = (Id) => {
    // Điều hướng đến trang chỉnh sửa sản phẩm với productId
    navigate(`./edit-category/${Id}`);
  };

  console.log(categories)
  return (
    <div className='admin-categories'>
      <div className="admin-categories-title">
        <h3>Categories</h3>
        <div className="btn-category-new">
          <Link to="new-category">New Category</Link>
        </div>
      </div>
      <div className="toast-container"><ToastContainer limit={2} /></div>
      <div className="admin-categories-content">
        <div className="admin-categories-content-list">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  <label>Background Img</label>
                </th>
                <th>
                  <label>Category Name</label>
                </th>
                <th>
                  <label>Category Status</label>
                </th>
                <th>
                  <label>Include In Menu</label>
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
                </th>
                <th>
                  <input type='text' placeholder='Category Name'></input>
                </th>
                <th>
                  <select>
                    <option>All</option>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
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
              {currentCategories && currentCategories.map((category) => (
                <tr key={category.id}>
                  <td><input type='checkbox' value={category.id} onChange={(e) => console.log(e.target.value)}></input></td>
                  <td className='td-img'><img src={process.env.REACT_APP_DEV_URL + category.attributes.CategoryImg.data[0].attributes.url}></img></td>
                  <td>{category.attributes.CategoryName}</td>
                  <td>
                    <div className="categories-status">
                      {category.attributes.CategoryStatus ? <span className='categories-status-true'><GrStatusGoodSmall /></span> : <span ><GrStatusGoodSmall className='categories-status-false' /></span>}
                    </div>
                  </td>
                  <td className='category-visibility'>
                    {category.attributes.CategoryVisibility ? <label>Yes</label>: <label>No</label>}
                  </td>
                  <td className='categories-actions'>
                    <span><AiFillEdit className='icon action-edit' onClick={() => handleEditCategory(category.id)}/></span>
                    <span><MdDelete className='icon action-dele' onClick={() => handleDeleCategory(category.id)}/></span>
                  </td>
                </tr>
              ))}

              <div className="current-page-number">
                <div className="number-categories-page">
                  <h4>Show</h4>
                  <input
                    type="number"
                    min={10}
                    max={categories?.length}
                    value={categoriesPerPage}
                    onChange={handleNumberPageChange}
                  />
                  <h4>category page</h4>
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
                    <h4>Total: <span>{categories?.length}</span> Category</h4>
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

export default Categories