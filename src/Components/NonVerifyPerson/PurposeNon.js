import React, { useEffect, useState } from 'react'
import "../NonVerifyPerson/PurposeNon.css"
import Navbar from '../Navbar/Navbar'
import { purposeData } from '../PersonIdentify/Data'
import { useNavigate } from "react-router-dom"
import Button from '../BackButton/Button'
import axios from 'axios'
import { api } from "../Api/Api"
const PurposeNon = ({ language }) => {
  const [getNonVerifyPurpose, setGetVerifypurpose] = useState([])
  // console.log(purposeData)
  const navigate = useNavigate()
  const handleHouseDetails = (titleEnglish) => {
    // const details = { titleEnglish };
    localStorage.setItem('purposeData', JSON.stringify(titleEnglish));
    navigate("/nonHouseDetails")
  }
  // getNonVerifyPurposeData
  const getNonVerifyPurposeData = async () => {
    try {
      await axios.get(`${api}nonVerifyPurposeGet`).then((res) => {
        setGetVerifypurpose(res.data.userData)
      })
    } catch (error) {
      console.log("Internal Error")
    }

  }
  useEffect(() => {
    getNonVerifyPurposeData()
  })
  return (
    <>
      {/* <Navbar/> */}
      <div className="screen">

        <h1 className='purpose_heading'>{language === 'hindi' ? "Purpose of Visit " : "आने का उद्देश्य"}
        </h1>
        <div className="inner_screen_div " >

          <div className='inner_purpose_div'>
            {

              getNonVerifyPurpose.map((item, index) => {
                return (
                  <>
                    <div className="inner_purpose_data_div background_color_purpose" onClick={() => handleHouseDetails(item.nonVerifyPurposeEnglish)}>

                      <span className='' key={index}> <b className='purpose_b'>{language === 'hindi' ? item.nonVerifyPurposeEnglish
                        : item.nonVerifyPurposeHindi
                      }</b>
                      </span>

                    </div>
                  </>
                )
              }

              )
            }

          </div>
        </div>

        <Button />



      </div>
    </>
  )
}

export default PurposeNon