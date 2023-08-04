import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import './Basket.scss'

const Basket = ({ basket }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className='basket'>


                {!basket.length ? (
                    <div className="empty-basket">
                        <h3>Basket is empty</h3>
                        <div onClick={() => navigate('/')} className='btn-basket'>
                            <Button name='Go Shopping'></Button>
                        </div>
                    </div>
                ) : null}

            </div>
        </>
    )
}

export default Basket