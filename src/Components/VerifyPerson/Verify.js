import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "../VerifyPerson/Verify.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../BackButton/Button';
import { api } from "../Api/Api";
import axios from "axios";

const Verify = ({ language }) => {
  const [getVerifyMaid, setGetVerifyMaid] = useState([]);
  const [selectedMaid, setSelectedMaid] = useState(null);
  const [filteredMaidName, setFilteredMaidName] = useState([]);

  useEffect(() => {
    const getVerifyHouseMaid = async () => {
      try {
        const res = await axios.get(`${api}getVerifyHouseMaid`);
        setGetVerifyMaid(res.data.verifyHouseMaid);
        setFilteredMaidName(res.data.verifyHouseMaid); // Set the initial filtered list to the full list
      } catch (error) {
        console.error('Error fetching housemaids:', error);
      }
    };

    getVerifyHouseMaid();
  }, []);

  const handleInputChange = (event) => {
    const inputText = event.target.value.trim().toLowerCase();
    const filteredOptions = getVerifyMaid.filter((option) =>
      option.houseMaidEnglish.toLowerCase().includes(inputText)
    );
    setFilteredMaidName(filteredOptions);
  };

  const handleHousemaid = (item) => {
    axios.post(`${api}verify`, { entryHouseMaid: item })
      .then((res) => {
        console.log('Response:', res.data);
        toast.success(`${res.data.msg}`);
      })
      .catch((error) => {
        console.error('Error:', error);
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
              filteredMaidName && filteredMaidName.map((item, index) => (
                <div key={index} className="inner_purpose_data_div" onClick={() => setSelectedMaid(item.houseMaidEnglish)}>
                  <div className='inner_maid_div' onClick={() => handleHousemaid(item.houseMaidEnglish)}>
                    <b className='house_maid_icons'>👩‍🍳</b>
                    <span className='house_maid' >
                      <b className='maid_b'>{language === 'hindi' ? "Name: " : "नाम:"} </b>
                      {language === 'hindi' ? item.houseMaidEnglish : item.houseMaidHindi}
                    </span>
                  </div>
                </div>
              ))
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


