import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-end bg-blue-700 h-[3rem] space-x-44 pr-[10rem] font-bold items-center'>
        <NavLink to={"/"}>
            <h6 className='hover:text-white'>Home</h6>
        </NavLink>
        <NavLink to={"/addproduct"}>
            <h6 className='hover:text-white'>Become a Seller</h6>
        </NavLink>
    </div>
  )
}

export default Navbar