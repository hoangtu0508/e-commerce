import React, { useState } from 'react'
import './Category.scss'

const Category = () => {
    const [valueSelect, setValueSelect] = useState(null);
    // const handleCategoryChange = (e) => {
    //     setValueSelect(e.targer.value)
    //     console.log(valueSelect)
    // }
    console.log(valueSelect)
    const category = [
        {
            id: 1,
            name: 'Gọng kính'
        },
        {
            id: 2,
            name: 'Kính áp tròng'
        },
        {
            id: 3,
            name: 'Gọng kính trẻ em'
        },
        {
            id: 4,
            name: 'Tròng kính'
        },
        {
            id: 5,
            name: 'Kính râm'
        }
    ]
  return (
    <div className='category'>
        <select value={valueSelect || ''} onChange={(e) => setValueSelect(e.target.value)}>
        <option value="">Category</option>
            {category.map((cate) => (
                <option key={cate.id} value={cate.id}>{cate.name}</option>
            ))}
        </select>
        

    </div>
  )
}

export default Category