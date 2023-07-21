import React from 'react'
import './Input.scss'

const Input = (props) => {
    return (
        <div className='input'>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type={props.type}
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Input