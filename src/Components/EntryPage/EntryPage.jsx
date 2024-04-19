import React, { useState } from 'react';
import '../EntryPage/EntryPage.css';
import Navbar from '../Navbar/Navbar';
import EnteryPerson from '../EntryPerson/EnteryPerson';

const EntryPage = ({language,handleLanguageChange,appendToLocalStorage}) => {
 
  return (
    <div className="screen">
      {/* <Navbar language={language}  handleLanguageChange={handleLanguageChange} /> */}
      <EnteryPerson language={language} handleLanguageChange={handleLanguageChange} appendToLocalStorage={appendToLocalStorage}   />
    </div>
  );
};

export default EntryPage;
