import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import axios from 'axios'
import { api } from '../../Api/Api'
const HouseMiadData = () => {
  const [houseMaid,setHouseMaid]=useState([])
  const getHouseMaid=()=>{
axios.get(`${api}getVerifyHouseMaid`).then((res)=>{
 try {
  // console.log(res.data.verifyHouseMaid
  //   )
    setHouseMaid(res.data.verifyHouseMaid)
 } catch (error) {
   console.log("Internal Server Error")
 }
})
  }
  useEffect(()=>{
    getHouseMaid()
  })
  return (
    <div className="main_admin">
    
    <SideBar/>
    <div className="admin_content">
    <div className='table_div tabel_div_two'>
      <div className='top_heading_div'>
      <h2 className='non_verify_user'>Name of HouseMaid</h2>
      
      </div>
      <table className='tabel_div_two'>
        <thead>
          <tr>
            <th>Hosue Maid</th>
          
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {houseMaid.length === 0 ? (
            <tr>
              <td colSpan="6" className='not_user_yet'><h2>Not User Yet</h2></td>
            </tr>
          ) : (
            houseMaid.map((item) => (
              <tr key={item._id}>
                <td className='entryName'>{item.houseMaidEnglish
}/{item.houseMaidHindi
}</td>
               
               
               
                <td className='delBtn'><button >Edit</button></td>
                <td className='delBtn'><button >Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

     

    </div>




    </div>
    </div>
  )
}

export default HouseMiadData
