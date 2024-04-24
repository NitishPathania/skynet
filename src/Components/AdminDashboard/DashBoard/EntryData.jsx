import React, { useState ,useEffect} from 'react'
import SideBar from '../SideBar/SideBar'
import "../DashBoard/DashBoard.css"

import { api } from '../../Api/Api'
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import EditEntries from './EditEntries'
import { useParams } from 'react-router-dom'

const EntryData = () => {
    const params=useParams()
  const [idType,setIdType]=useState([])

const [typeEntry,setTypeEntry]=useState([])
    const getTypeEntry=async()=>{
        try {
            
           await axios.get(`${api}getEntryUser`).then((res)=>{

            setTypeEntry(res.data.userData)

           })   
        } catch (error) {
              console.log("Internal Server Error ")
        }
    }
    useEffect(()=>{
        getTypeEntry()
       
    })
  
    const handleEditEntries=(item)=>{
        // console.log(item)
        setIdType(item)


    
        }
      
            localStorage.setItem("editTypeEntry",JSON.stringify(idType))
  return (
   

   <>
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
            <th>Entry Type</th>
          
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {typeEntry.length === 0 ? (
            <tr>
              <td colSpan="6" className='not_user_yet'><h2>Not User Yet</h2></td>
            </tr>
          ) : (
        typeEntry.map((item) => (
              <tr key={item._id}>
                <td className='entryName'>{item.titleEnglish}/{item.titleHindi}</td>
               
               
               
                <td className='delBtn'><button onClick={()=>handleEditEntries(item._id)}><EditEntries /></button></td>
                <td className='delBtn'><button >Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

     

    </div>




    </div>
    </div>
    
    </>
  )
}

export default EntryData
