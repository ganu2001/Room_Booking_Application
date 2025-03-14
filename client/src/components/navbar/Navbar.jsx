import React from 'react'
import styles from './Navbar.module.css'
import { Avatar } from 'antd'
import Cookies from 'js-cookie';
import { Link } from 'react-router';


export const Navbar = () => {
  return (
	<div className={styles.navbar}>
      <div>
        <Link to="/">
          <b style={{fontSize: '20px'}}>RoomBook</b>
        </Link>
      </div>
      <div>
        <Avatar size={"medium"}>{Cookies.get("userName") ? Cookies.get("userName")[0] : null}</Avatar>
      </div>
  </div>
  )
}
