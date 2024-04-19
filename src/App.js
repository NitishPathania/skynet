
import EntryPage from './Components/EntryPage/EntryPage';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PurposeNon from './Components/NonVerifyPerson/PurposeNon';
import Verify from './Components/VerifyPerson/Verify';
import Navbar from './Components/Navbar/Navbar';
import HouseDetails from './Components/NonVerifyPerson/HouseDetails';
import AddharNonVerify from './Components/NonVerifyPerson/AddharNonVerify';
import { useState } from 'react';
// import NonVerifyUser from '../../Server/models/NonVerifyUser';
import GetNonVerifyUser from './Components/getNonVerifyUser/GetNonVerifyUser';
function App() {
  const [language, setLanguage] = useState('english');

  const handleLanguageChange = () => {
    const newLanguage = language === 'english' ? 'hindi' : 'english';
    setLanguage(newLanguage);
  };
  
  return (
    <div className="App">
       <BrowserRouter>
      
    <Navbar language={language}  handleLanguageChange={handleLanguageChange} />
    
    
      <Routes>
          
          <Route path="/" element={<EntryPage language={language}   />} />
          <Route path="/nonVerify" element={<PurposeNon language={language}  />} />
          <Route path="/verify" element={<Verify language={language} />}/>
          <Route path="/nonHouseDetails" element={<HouseDetails language={language}/>}/>
          <Route path="/nonAadharCard" element={<AddharNonVerify language={language}/>}/>
          <Route path="/nonVerifyUser" element={<GetNonVerifyUser language={language}   />} />
         
        
    
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
