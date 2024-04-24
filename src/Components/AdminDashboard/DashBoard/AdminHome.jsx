import React from 'react'
import SideBar from '../SideBar/SideBar'
import "../DashBoard/DashBoard.css"
import { Outlet } from 'react-router-dom'
import GetNonVerifyData from './GetNonVerifyData'
const AdminHome = () => {
  return (
    <div>
<div className="main_admin">
    
{/* <SideBar/> */}
        <div className="admin_content">
            <GetNonVerifyData/>
        </div>
      </div>

    </div>
  )
}

export default AdminHome