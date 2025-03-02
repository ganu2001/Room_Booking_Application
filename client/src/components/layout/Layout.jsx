import React from 'react'
import { Outlet } from 'react-router-dom'
import {Navbar} from '../../components/navbar/Navbar'

export const Layout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh" }}>
      <Navbar />
      <Outlet />
    </div>
  )
}