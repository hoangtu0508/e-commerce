import React, { useState } from 'react'

const useBasket = () => {
    const [basket, setBasket] = useState([]);

    const addToBasket = async ({
        id,
        qty,
        attributes: {
            ProductName,
            ProductPrice,
            ProductImg,
            ProductDesc,
        }
    }) => {
        try {
            setBasket([
                ...basket,
                {
                    ProductName,
                    ProductPrice,
                    ProductImg,
                    ProductDesc,
                    ProductId: id,
                    qty: Number(qty),
                    
                }
            ])
        } catch (error) {

        }
    }
    return { basket, addToBasket }
}

export default useBasket