import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "../VerifyPerson/Verify.css";
import { maidName } from '../PersonIdentify/Data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../BackButton/Button';
import { api } from "../Api/Api"
import axios from "axios"
const Verify = ({ language }) => {
  const [selectedMaid, setSelectedMaid] = useState(null);
  const [filteredMaidName, setFilteredMaidName] = useState(maidName);

  const handleInputChange = (event) => {
    const inputText = event.target.value.trim().toLowerCase();
    const filteredOptions = maidName.filter((option) =>
      option.maidName.toLowerCase().includes(inputText)
    );
    setFilteredMaidName(filteredOptions);
  };

  const handleHousemaid = (item) => {



    axios.post(`${api}verify`, { entryHouseMaid: item })
      .then((res) => {
        console.log('Response:', res.data);

        // User registered successfully
        toast.success(`${res.data.msg}`);

        // User already exists

      })
      .catch((error) => {
        console.error('Error:', error);

        // Handle error response here
        toast.error(" User Already Exist");
      });
  };


  return (
    <>
      <div className="screen">
        <h1 className='purpose_heading'>
          {language === 'hindi' ? " List of House maid" : "नौकरानी"}
        </h1>
        <div className='maid_input'>
          <input
            type="text" className='maid_input_bottom'
            placeholder={language === 'hindi' ? "Search Maid Name" : "नाम"}
            onChange={handleInputChange}
          />
        </div>
        <div className="inner_screen_div " >

          <div className='inner_purpose_div'>
            {
              filteredMaidName.map((item, index) => {
                return (
                  <>
                    <div key={index} className="inner_purpose_data_div" onClick={() => setSelectedMaid(item.maidName)}>
                      <div className='inner_maid_div' onClick={() => handleHousemaid(item.maidName)}>
                        <b className='house_maid_icons'>{item.icons}</b>
                        <span className='house_maid' >
                          <b className='maid_b'>{language === 'hindi' ? "Name: " : "नाम:"} </b> {item.maidName}
                        </span>
                      </div>
                    </div>


                  </>
                )
              }

              )
            }

          </div>
        </div>
        <Button />
        <ToastContainer />
      </div>
    </>
  );
}

export default Verify;



