import React from 'react'
import './SliderBar.scss'
import { Link } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BiSolidBox,BiLink} from 'react-icons/bi'
import {BsFillBoxFill,BsFillPeopleFill} from 'react-icons/bs'
const SliderBar = () => {
    return (
        <div className='admin-slider'>
            <div className='admin-slider-bar link'>
                <h3>QUICK LINKS</h3>
                <div className="admin-list">
                    <ul>
                        <li>
                            <Link><AiFillHome className='admin-list-icon'/>Dashboard</Link>
                        </li>
                        <li>
                            <Link><BiSolidBox className='admin-list-icon'/>New Product</Link>
                        </li>
                        <li>
                            <Link><BiLink className='admin-list-icon'/>New Category</Link>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="admin-slider-bar catalog">
                <h3>CATALOG</h3>
                <div className="admin-list">
                    <ul>
                        <li>
                            <Link><BiSolidBox className='admin-list-icon'/>Product</Link>
                        </li>
                        <li>
                            <Link><BiLink className='admin-list-icon'/>Categories</Link>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="admin-slider-bar sale">
                <h3>SALE</h3>
                <div className="admin-list">
                    <Link><BsFillBoxFill className='admin-list-icon'/>Order</Link>
                </div>
            </div>
            <div className="admin-slider-bar customers">
                <h3>CUSTOMER</h3>
                <div className="admin-list">
                    <Link><BsFillPeopleFill className='admin-list-icon'/>Customers</Link>
                </div>
            </div>
        </div>
    )
}

export default SliderBar