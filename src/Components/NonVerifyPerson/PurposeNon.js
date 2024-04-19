import React from 'react'
import "../NonVerifyPerson/PurposeNon.css"
import Navbar from '../Navbar/Navbar'
import { purposeData } from '../PersonIdentify/Data'
import {useNavigate} from "react-router-dom"
import Button from '../BackButton/Button'
const PurposeNon = ({language}) => {
  console.log(purposeData)
  const navigate=useNavigate()
  const handleHouseDetails=(titleEnglish)=>{
    // const details = { titleEnglish };
    localStorage.setItem('purposeData', JSON.stringify(titleEnglish));
    navigate("/nonHouseDetails")
  }
  return (
    <>
   <div className="screen">
  
    <h1 className='purpose_heading'>{language === 'hindi' ? "Purpose of Visit ":"आने का उद्देश्य"}
      </h1>
 <div className="inner_screen_div " >

     <div className='inner_purpose_div'>
      {

purposeData.map((item,index)=>{
  return(
    <>
    <div className="inner_purpose_data_div background_color_purpose" onClick={() => handleHouseDetails(item.titleEnglish)}>
           
     <span className=''  key={index}> <b  className='purpose_b'>{language === 'hindi' ? item.titleEnglish :item.titleHindi}</b>
      </span>
        
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

export default PurposeNon