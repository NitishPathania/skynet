import React from 'react'
import "../SideBar/SideBar.css"
import { Link } from 'react-router-dom'
import EntryData from '../DashBoard/EntryData'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const SideBar = () => {
    const navigate=useNavigate()


    const handleLogout=()=>{
        Swal.fire({
          title: "Are you sure?",
        
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            
            localStorage.clear()
            navigate("/login")
          }
        });
            
       }
  return (
   
    <div className="sidebar">
    <h2>Admin Dashboard</h2>
    <ul>
      <li>
        <Link   to="/admin/get-user">Request</Link>
      </li>
      <li>
        <Link to="/admin/entry-data">Type Of Entry</Link>
      </li>
      <li>
        <Link to="/admin/purpose-data">Purposes</Link>
      </li>
      <li>
        <Link to="/admin/house-data">House Details</Link>
      </li>
      <li>
        <Link to="/admin/house-maid">House Maids</Link>
      </li>
      <li >
      <button className='logout_btn' onClick={handleLogout}>LogOut</button>
      </li>
    </ul>
    
  </div>
  
 
  
  
  )
}

export default SideBar
