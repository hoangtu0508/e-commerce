import React from 'react'
import { Link } from 'react-router-dom'
import './Categories.scss'

const Categories = () => {
  return (
    <div className='admin-categories'>
      <div className="admin-categories-title">
        <h3>Categories</h3>
        <div className="btn-category-new">
        <Link to="new-category">New Category</Link>
        </div>
      </div>
    </div>
  )
}

export default Categories