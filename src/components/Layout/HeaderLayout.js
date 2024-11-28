import React from 'react'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import UpButton from '../upButton/UpButton'

const HeaderLayout = ({children}) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
      <UpButton/>
      <Outlet/>
      <Footer />
    </div>
  )
}

export default HeaderLayout
