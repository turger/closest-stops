import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import SearchAddress from './SearchAddress'
import Menu from './Menu'

const Pagewrapper = () => (
  <>
    <Header/>
    <SearchAddress/>
    <Outlet />
    <Menu/>
  </>
)

export default Pagewrapper;
