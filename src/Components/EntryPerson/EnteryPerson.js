import React, { useEffect, useState } from 'react';
import '../EntryPerson/EntryPerson.css';
import { userData } from "../PersonIdentify/Data";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import axios from "axios"
import {api} from "../Api/Api"
const EnteryPerson = ({ language }) => {
  const [getEntryUser,setGetEntryUser]=useState([])
  const navigate = useNavigate()

  // const entryPage = () => {
  //   navigate("/");
  // };

  // const nonVerifyCall = () => {
   
  // };

  // const verifyCall = () => {
  //   navigate("/verify");
  // };

  const handelEntry = (item) => {
   console.log(item)
   if(item==="House maid"){
    localStorage.setItem('entryName', JSON.stringify(item))
    navigate("/verify")
   }
   else{
    navigate("/nonVerify");
    localStorage.setItem('entryName', JSON.stringify(item))
   }

    // localStorage.setItem('entryName', JSON.stringify(userData[index].title.english))
    // switch (index) {
    //   case 0:
    //   case 1:
    //   case 2:
    //   case 4:
    //   case 5:
    //   case 6:
    //   case 7:
    //     return nonVerifyCall();
    //   case 3:
    //     return verifyCall();
    //   default:
    //     return entryPage();
    // }
  };
  
   const getTypeEntry=async()=>{
     try {
             await axios.get(`${api}getEntryUser`).then((res)=>{
                setGetEntryUser(res.data.userData)
             })
     } catch (error) {
         console.log("Internal Server Error")
     }
   }
   useEffect(()=>{
    getTypeEntry()
   })
  return (
    <>
    {/* <Navbar/> */}
      <h1 className='entry_heading'>
        {language === 'hindi' ? 'Type of Entry' : 'प्रवेश के प्रकार'}
      </h1>
      <div className="entry_person_div">
        {getEntryUser.map((item, index) => (
          <div key={index} onClick={() =>
            handelEntry(item.titleHindi)} className="inner_person_details_div allColor">
          <h5>{item.icon}</h5>
            
            <h6>
              {language === 'hindi' ? item.titleEnglish : item.titleHindi}
            </h6>
          </div>
        ))}
      </div>
    </>
  );
};

export default EnteryPerson;
