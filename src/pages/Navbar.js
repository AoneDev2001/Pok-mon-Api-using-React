import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {

  return (
    <div className='Navbar container-fluid shadow d-flex justify-content-state p-3'>
        <Link to="/" className='Logo '>Pokédex <span>Challenge</span></Link>
        
    </div>
  )
}

export default Navbar