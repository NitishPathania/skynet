import React, { useEffect, useState } from 'react'
import "../NonVerifyPerson/PurposeNon.css"
import Navbar from '../Navbar/Navbar'
import { purposeData } from '../PersonIdentify/Data'
import { nonHouseDetails } from "../PersonIdentify/Data"
import { useNavigate } from "react-router-dom"
import Button from '../BackButton/Button'
import { api } from "../Api/Api"
import axios from "axios"
const HouseDetails = ({ language }) => {
  const [getHouseDetails, setGetHouseDetails] = useState([])
  const navigate = useNavigate()
  const handleAadharCard = (housename, houseOwner) => {
    const details = { housename: housename, houseOwner: houseOwner };
    // console.log(details)

    localStorage.setItem('houseDetails', JSON.stringify(details));
    navigate("/nonAadharCard")
  }
  const getHouseDetail = async () => {
    try {
      await axios.get(`${api}getHouseDetails`).then((res) => {
        console.log(res.data.userData)
        setGetHouseDetails(res.data.userData)
      })
    } catch (error) {

    }
  }
  useEffect(() => {
    getHouseDetail()
  })
  return (
    <>
      <div className="screen">
        {/* <Navbar/> */}
        <h1 className='purpose_heading'>
          {language === 'hindi' ? "Where to visit" : "कहाँ जाना है"}
        </h1>
        <div className="inner_screen_div " >

          <div className='inner_purpose_div'>
            {

              getHouseDetails.map((item, index) => {
                return (
                  <>
                    <div className="inner_purpose_data_div" onClick={() => handleAadharCard(item. houseNo, item.ownerNameEnglish)}>
                      <h6 className='icons_house'>🏠</h6>
                      <span className="house_numbering" key={index}><b>{language === 'hindi' ? "House No." : "घर का नंबर."}</b>{item.
                        houseNo
                      }</span>
                      <p key={index} className='owner'><b>{language === 'hindi' ? "Owner" : "मालिक"}</b>&nbsp;{language === 'hindi' ? `${item.
                        ownerNameEnglish}` : `${item.
                          ownerNameHindi
                        }`}</p>

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

export default HouseDetails