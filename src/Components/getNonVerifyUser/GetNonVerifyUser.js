import React, { useEffect, useState } from 'react';
import "../getNonVerifyUser/GetNonVerify.css";
import { api } from "../Api/Api";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const GetNonVerifyUser = () => {
  const navigate=useNavigate()
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(`${api}getNonVerify`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId) {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        try {
          await axios.delete(`${api}delData/${userId}`);
          toast.success("User has been deleted successfully");
          // Update user data after deletion if needed
          getUser();
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    } else {
      console.error('Invalid user ID');
    }
  };

  const pageCount = Math.ceil(userData.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  const handleClickPrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNext = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };


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
    <div className='table_div'>
      <div className='top_heading_div'>
      <h2 className='non_verify_user'>Non-Verify User Data</h2>
      <button onClick={handleLogout}>LogOut</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Entry Name</th>
            <th>House Details</th>
            <th>Purpose Data</th>
            <th>User Image</th>
            <th>Aadhar Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="6" className='not_user_yet'><h2>Not User Yet</h2></td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item._id}>
                <td className='entryName'>{item.entryName}</td>
                <td className='houseDetails'>
                  <b>1.HouseNo.</b>{item.houseDetails.housename} <b>2.Owner</b> {item.houseDetails.houseOwner}
                </td>
                <td className='purposeData'>{item.purposeData}</td>
                <td className='imageUser'><img className='imageUserImg' src={item.userImage} alt="" /></td>
                <td className='imageUser'><img className='imageUserImg' src={item.aadharImage} alt="" /></td>
                <td className='delBtn'><button onClick={() => handleDeleteUser(item._id)}>Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handleClickPrevious} disabled={currentPage === 0}>Previous</button>
        <span>{currentPage + 1} - {pageCount}</span>
        <button onClick={handleClickNext} disabled={currentPage === pageCount - 1}>Next</button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default GetNonVerifyUser;
