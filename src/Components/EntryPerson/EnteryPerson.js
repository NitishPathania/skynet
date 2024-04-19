import React from 'react';
import '../EntryPerson/EntryPerson.css';
import { userData } from "../PersonIdentify/Data";
import { useNavigate } from "react-router-dom";

const EnteryPerson = ({ language }) => {
  const navigate = useNavigate();

  const entryPage = () => {
    navigate("/");
  };

  const nonVerifyCall = () => {
    navigate("/nonVerify");
  };

  const verifyCall = () => {
    navigate("/verify");
  };

  const handelEntry = (index) => {


    localStorage.setItem('entryName', JSON.stringify(userData[index].title.english))
    switch (index) {
      case 0:
      case 1:
      case 2:
      case 4:
      case 5:
      case 6:
      case 7:
        return nonVerifyCall();
      case 3:
        return verifyCall();
      default:
        return entryPage();
    }
  };

  return (
    <>
      <h1 className='entry_heading'>
        {language === 'hindi' ? 'Type of Entry' : 'प्रवेश के प्रकार'}
      </h1>
      <div className="entry_person_div">
        {userData.map((item, index) => (
          <div key={index} onClick={() =>
            handelEntry(index)} className="inner_person_details_div allColor">
            <h5>{item.icons}</h5>
            {/* <h6>{item.title.english} */}
            <h6>
              {language === 'hindi' ? item.title.english : item.title.hindi}
            </h6>
          </div>
        ))}
      </div>
    </>
  );
};

export default EnteryPerson;
