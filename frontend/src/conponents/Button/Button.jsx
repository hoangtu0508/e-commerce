import React from 'react'
import './Button.scss'

const Button = (props) => {
  return (
    <div className='button'>
        <span><button>{props.name}</button></span>
    </div>
  )
}

export default Button