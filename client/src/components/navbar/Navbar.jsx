import React from 'react'
import styles from './Navbar.module.css'
import { Avatar } from 'antd'
import Cookies from 'js-cookie';


export const Navbar = () => {
  return (
	<div className={styles.navbar}>
      <div>
        <b style={{fontSize: '20px'}}>RoomBook</b>
      </div>
      <div>
        <Avatar size={"medium"}>{Cookies.get("userName") ? Cookies.get("userName")[0] : null}</Avatar>
      </div>
  </div>
  )
}
