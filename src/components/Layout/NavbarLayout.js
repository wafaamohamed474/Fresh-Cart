import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'

const NavbarLayout = ({children}) => {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
      <Outlet/>
      <Footer />
    </div>
  )
}

export default NavbarLayout
