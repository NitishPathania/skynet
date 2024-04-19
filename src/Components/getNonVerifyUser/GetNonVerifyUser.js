import React, { useEffect, useState } from 'react'
import "../getNonVerifyUser/GetNonVerify.css"
import { api } from "../Api/Api"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
const GetNonVerifyUser = () => {
  const [userData, setUserData] = useState([])

    const getUser = async () => {
      const response = await axios.get(`${api}getNonVerify`)

      // console.log(response)
      setUserData(response.data)

    }

    useEffect(() => {
      getUser()
  }, [])

  const handleDeleteUser = (userId) => {
    if (userId) {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        try {
          axios.delete(`${api}delData/${userId}`).then(() => {
            toast.success("User has been deleted successfully");
            // Update user data after deletion if needed
            getUser();
          });
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    } else {
      console.error('Invalid user ID');
    }
  };
  
  
  return (
    <div>
      <h2  className='non_verify_user'>NonVerify User Data</h2>
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
          {
             userData.length==""?
              <div className='not_user_yet'><h2 >Not User Yet</h2></div>:
            userData.map((item) => {
              return (
                <>
              
                <tr key={item._id}>
                  <td className='entryName'>{item.entryName}</td>
                  <td className='houseDetails'><b>1.HouseNo.</b>{(item.houseDetails.housename)} <b>2.Owner</b> {item.houseDetails.houseOwner
}</td>
                  <td className='purposeData'> {item.purposeData }</td>
                  <td  className='imageUser'><img  className='imageUserImg'  src={item.userImage} alt="" /></td>
                  <td  className='imageUser'><img className='imageUserImg'  src={item. aadharImage} alt="" /></td>
                 <td className='delBtn'> <button onClick={() => handleDeleteUser(item._id)}>Delete</button></td> 
                  </tr>
                </>
              )

            })
          }


        </tbody>
      </table>
      <ToastContainer/>
    </div>
  )
}

export default GetNonVerifyUser