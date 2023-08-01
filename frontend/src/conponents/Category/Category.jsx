import React, { useState, useContext } from 'react';
import './Category.scss';
import { Context } from '../../utils/AppContext';

const Category = () => {
  const { categories } = useContext(Context);

  const [valueSelect, setValueSelect] = useState(null);
  if (categories === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='category'>
      <select value={valueSelect || ''} onChange={(e) => setValueSelect(e.target.value)}>
        <option value=''>Category</option>
        {categories.map((cate) => (
          <option key={cate.id} value={cate.id}>
            {cate.attributes.CategoryName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;