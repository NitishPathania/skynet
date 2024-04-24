import React from 'react'
import GetNonVerifyUser from '../../getNonVerifyUser/GetNonVerifyUser'
import SideBar from '../SideBar/SideBar'
const GetNonVerifyData= () => {
  return (
    <div>
    <div className="main_admin">
        <SideBar/>
            <div className="admin_content">
                <GetNonVerifyUser/>
            </div>
          </div>
    
        </div>
  )
}

export default GetNonVerifyData
