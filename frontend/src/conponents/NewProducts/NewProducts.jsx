import React, {useContext} from 'react'
import Product from '../Product/Product'
import { Link } from 'react-router-dom'
import './NewProducts.scss'
import { Context } from '../../utils/AppContext'

const NewProducts = () => {
    const {products} = useContext(Context)
    console.log(products)
    return (
        <div className='product-hot'>
            <div className='product-hot-header'>
                <h3>HOT TREND</h3>
                <h1>HÀNG MỚI LÊN KỆ</h1>
            </div>
            <div className='product-hot-container'>
                <div className='list-products'>
                    {products?.slice(0, 10).map((product) => {
                        console.log(product)
                        return (
                            <div className='product-new' key={product.id}>
                                <Product product={product} />
                                
                            </div>
                            
                        )         
                    })}
                    
                </div>

                <Link to='shop' className='product-hot-container-btn'>Xem tất cả</Link>

            </div>
        </div>

    )
}

export default NewProducts