import React from 'react'
import "../NonVerifyPerson/PurposeNon.css"
import Navbar from '../Navbar/Navbar'
import { purposeData } from '../PersonIdentify/Data'
import  {nonHouseDetails } from "../PersonIdentify/Data"
import {useNavigate} from "react-router-dom"
import Button from '../BackButton/Button'
const HouseDetails = ({language}) => {
    const navigate=useNavigate()
    const handleAadharCard=(housename,houseOwner)=>{
      const details = { housename:housename,  houseOwner:houseOwner };
      console.log(details)
      
      localStorage.setItem('houseDetails',JSON.stringify(details));
     navigate("/nonAadharCard")
    }
  return (
    <>
    <div className="screen">
    {/* <Navbar/> */}
    <h1 className='purpose_heading'>
    {language === 'hindi' ? "Where to visit" :"कहाँ जाना है"}
    </h1>
 <div className="inner_screen_div " >
 
     <div className='inner_purpose_div'>
      {

nonHouseDetails.map((item,index)=>{
  return(
    <>
    <div className="inner_purpose_data_div" onClick={()=>handleAadharCard(item.houseNumber,item.owner)}>
             <h6 className='icons_house'>{item.icons}</h6>
            <span className="house_numbering" key={index}><b>{language === 'hindi' ? "House No." :"घर का नंबर."}</b>{item.houseNumber}</span>
            <p key={index}  className='owner'><b>{language === 'hindi' ? "Owner" :"मालिक"}</b>&nbsp;{item.owner}</p>
            
      </div>
    </>
  )
}

      )
}

     </div>
     </div>


<Button/>

 </div>


    </>
  )
}

export default HouseDetails