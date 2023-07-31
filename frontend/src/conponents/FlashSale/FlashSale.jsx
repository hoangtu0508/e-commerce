import React,{useContext} from 'react'
import './FlashSale.scss'
import { Context } from '../../utils/AppContext'
import Slide from '../Slide/Slide'


const FlashSale = () => {
    const {products} = useContext(Context)
   
    return (
        <div className='flash-sale'>
            <div className='flash-sale-header'>
                <h1>SĂN FLASH SALE</h1>
                <p>Hàng trăm sản phẩm bắt trend mới nhất</p>
            </div>
            <div className='flash-sale-container'>
               
                {/* <Product /> */}
                <Slide products={products} slidesToShow={5} autoplaySpeed={3000}/>
            </div>
        </div>
    )
}

export default FlashSale