import React, {useState} from 'react'
import './SliderBar.scss'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderBar = () => {
    const category = [
        {
            id: 0,
            name: 'Gọng kính',
        },
        {
            id: 1,
            name: 'Kính ap tròng',
        },
        {
            id: 2,
            name: 'Gọng kính trẻ em',
        },
        {
            id: 3,
            name: 'Tròng kính',
        },
        {
            id: 4,
            name: 'Kính râm',
        },
    ]

    const [priceRange, setPriceRange] = useState([50, 200]); // giá trị mặc định của thanh kéo

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };
    return (
        <div className='slider-bar-shop'>
            <div className='category'>
                <h3>Categories</h3>
                <hr />
                <ul>
                    {category.map((category) => {
                        return (
                            <li><input type='checkbox'></input>{category.name}</li>
                        )
                    })}
                </ul>
            </div>

            <div className='category'>
                <h3>Shape</h3>
                <hr />
                <ul>
                    {category.map((category) => {
                        return (
                            <li><input type='checkbox'></input>{category.name}</li>
                        )
                    })}
                </ul>
            </div>

            <div className='category'>
                <h3>Trademark</h3>
                <hr />
                <ul>
                    {category.map((category) => {
                        return (
                            <li><input type='checkbox'></input>{category.name}</li>
                        )
                    })}
                </ul>
            </div>

            <div className='slider-price'>
                <h3>Price</h3>
                <div className='slider'>
                    <Slider
                        range
                        min={0}
                        max={500}
                        defaultValue={priceRange}
                        onChange={handlePriceRangeChange}
                        trackStyle={[{ backgroundColor: '#4CAF50' }]}
                        handleStyle={[
                            { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
                            { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
                        ]}
                        railStyle={{ backgroundColor: '#ccc' }}
                    />
                </div>

                <div className='price'>
                    Giá: ${priceRange[0]} - ${priceRange[1]}
                </div>
            </div>
        </div>
    )
}

export default SliderBar