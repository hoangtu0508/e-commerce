import React from 'react'
import { Link } from 'react-router-dom'
import './LinkFieds.scss'


const LinkFieds = (props) => {
  return (
    <div className='link'>
        <span><Link to={props.src} className='link-click'>{props.name}</Link></span>
    </div>
  )
}

export default LinkFieds