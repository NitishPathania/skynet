
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
import Sign from './Components/LoginSignIn/SignInFolder/Sign';
import Login from './Components/LoginSignIn/LoginFolder/Login';
import Protected from './Components/ProtectedRoute.js/Protected';
import AdminHome from './Components/AdminDashboard/DashBoard/AdminHome';
import EntryData from './Components/AdminDashboard/DashBoard/EntryData';
import PurposeData from './Components/AdminDashboard/DashBoard/PurposeData';
import HouseData from './Components/AdminDashboard/DashBoard/HouseData';
import HouseMiadData from './Components/AdminDashboard/DashBoard/HouseMiadData';
import GetNonVerifyData from './Components/AdminDashboard/DashBoard/GetNonVerifyData';

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
          <Route path='/admin' element={<Protected/>}>
          {/* <Route path="/nonVerifyUser" element={<GetNonVerifyUser language={language}   />} />
          <Route path="/dashboard" element={<DashBoard language={language}   />} /> */}
          <Route index element={<AdminHome language={language}   />} />
          <Route path='entry-data' element={<EntryData language={language}   />} />
          <Route path='house-data' element={<HouseData language={language}   />} />
          <Route path='purpose-data' element={<PurposeData language={language}   />} />
          <Route path='house-maid' element={<HouseMiadData language={language}   />} />
          <Route path='get-user' element={<GetNonVerifyData language={language}   />} />

          </Route>
          <Route path="/signUp" element={<Sign language={language}   />} />
          <Route path="/login" element={<Login language={language}   />} />
         
         
        
    
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
