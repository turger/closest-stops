import Header from './Header'
import Menu from './Menu'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Pagewrapper = () => (
  <>
    <Header />
    <Outlet />
    <Menu />
  </>
)

export default Pagewrapper
