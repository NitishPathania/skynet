import React from 'react';
import '../Navbar/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ language, handleLanguageChange }) => {

  const navigate = useNavigate()

  return (
    <div className='outer_navbar'>
      
      <div className="inner_screen_div allColor">

        <h5 onClick={()=>navigate('/')}>SkyNetEnclave</h5>

        <div className="switch">
          <input
            id="language-toggle"
            checked={language === 'hindi'}
            className="check-toggle check-toggle-round-flat"
            type="checkbox"
            onChange={() => handleLanguageChange()}
          />
          <label htmlFor="language-toggle"></label>
          <span className="on">हिंदी</span>
          <span className="off">Eng</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
