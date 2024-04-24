import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import "../DashBoard/DashBoard.css"
import { api } from '../../Api/Api'
import axios from 'axios'

const PurposeData = () => {
    const [purposeData,setPurposeData]=useState([])
    const getPurposeData=async()=>{
        try {
           await axios.get(`${api}nonVerifyPurposeGet`).then((res)=>{
                // console.log(res.data.userData)
                setPurposeData(res.data.userData)
            })
        } catch (error) {
            console.log("Internal Server Error")
        }
    }
    useEffect(()=>{
        getPurposeData()
    })
  return (
    <div className="main_admin">
    
    <SideBar/>
    <div className="admin_content">
    <div className='table_div tabel_div_two'>
      <div className='top_heading_div'>
      <h2 className='non_verify_user'>Type of Entries</h2>
      
      </div>
      <table className='tabel_div_two'>
        <thead>
          <tr>
            <th>Purpose Data</th>
          
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {purposeData.length === 0 ? (
            <tr>
              <td colSpan="6" className='not_user_yet'><h2>Not User Yet</h2></td>
            </tr>
          ) : (
            purposeData.map((item) => (
              <tr key={item._id}>
                <td className='entryName'>{item.nonVerifyPurposeEnglish
}/{item.nonVerifyPurposeHindi
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

export default PurposeData
