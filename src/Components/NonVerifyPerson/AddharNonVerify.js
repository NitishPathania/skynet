import React, { useRef, useState, useCallback } from 'react';
import Navbar from '../Navbar/Navbar';
import "../NonVerifyPerson/AddharNonVerify.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../BackButton/Button';
import { api } from "../Api/Api";
import axios from "axios";
import Webcam from "react-webcam";
import { useNavigate } from 'react-router-dom';
const AddharNonVerify = ({ language }) => {
  const  navigate= useNavigate()
  const webcamRef = useRef(null); // create a webcam reference
  const webcamRefaadhar = useRef(null)
  const [imgSrc, setImgSrc] = useState("Images/photologo"); // initialize it
  const [imgSrcAadhar, setImgSrcAadhar] = useState("Images/aadharlogo")


  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    localStorage.setItem("userImage", imageSrc)
    console.log(imageSrc)
  }, [webcamRef, setImgSrc]);

  const retake = () => {
    setImgSrc(null);
  };
  const retakeAadhar = () => {
    setImgSrcAadhar(null)
  }
  const captureAadhar = useCallback(() => {
    const imageSrc = webcamRefaadhar.current.getScreenshot();
    setImgSrcAadhar(imageSrc);
    localStorage.setItem("aadharImage", imageSrc)
  }, [webcamRefaadhar, setImgSrcAadhar]);

  const handleAadharDetails = () => {
    // Retrieve data from localStorage
    const entryName = JSON.parse(localStorage.getItem("entryName"));
    const purposeData = JSON.parse(localStorage.getItem("purposeData"));
    const houseDetails = JSON.parse(localStorage.getItem("houseDetails"));
    const userImage = localStorage.getItem("userImage");
    const aadharImage = localStorage.getItem("aadharImage");
    if (!entryName) {
      toast.warn(language === 'hindi' ? "Please Select Entry Type" : "कृपया प्रवेश प्रकार चुनें");
    } else if (!purposeData) {
      toast.warn(language === 'hindi' ? "Select the Purpose" : "उद्देश्य चुनें")
    }
    else if(! houseDetails ){
      toast.warn(language === 'hindi' ? "Selected House Details" : "घर के विवरण चुने गए ")

    }
    else if(!userImage){
      toast.warn( language === 'hindi' ? "Please Click the Photo" : "कृपया फोटो क्लिक करें")
    }
    else if(!aadharImage){
      toast.warn(language === 'hindi' ? "Please Click Aadhar Photo" : "कृपया आधार फोटो क्लिक करें")
    }
  
    else {
      const userDetails = {
        entryName,
        purposeData,
        houseDetails: {
          housename: houseDetails.housename,
          houseOwner: houseDetails.houseOwner
        },
        userImage,
        aadharImage
      };
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      const getData = JSON.parse(localStorage.getItem("userDetails"));



      axios.post(`${api}nonVerify`, getData)
        .then((res) => {
          console.log('Response:', res.data);
          // Handle success response
          toast.success("Details added Successfully");
          window.localStorage.clear();
          setTimeout(()=>{
            navigate("/")
          },3000)
        

        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error response
        });
    }
  };


  return (
    <div>

      <div className="screen">

        <div className="main_verification">
          <div className="main_photo_verification" >

            {imgSrc ? (
              <img src={imgSrc} className='img_top' alt="webcam" />
            ) : (
              <div className='webcammaindiv'>

                <Webcam className='webcam' ref={webcamRef} videoConstraints={{ facingMode: 'user' }} />

              </div>
            )}
            <div className='verification_content'>

              {imgSrc ? (
                <p onClick={retake}>{language === 'hindi' ? "Take Photo" : "फोटो लें "}</p>
              ) : (
                <p onClick={capture}> {language === 'hindi' ? " Capture Photo " : "तस्वीर लें"}</p>
              )
              }
            </div>
          </div>

          <div className="main_aadhar_verification">

            {imgSrcAadhar ? (
              <img src={imgSrcAadhar} className='img_top' alt="webcam" />
            ) : (

              <div className='webcammaindiv_aadhar'>
                <Webcam className='webcam' ref={webcamRefaadhar} videoConstraints={{ facingMode: 'environment' }} />
              </div>

            )}
            <div className='verification_aadhar_content' >

              {imgSrcAadhar ? (
                <p onClick={retakeAadhar}>{language === 'hindi' ? "Take Photo" : "फोटो लें "}</p>
              ) : (
                <p onClick={captureAadhar}> {language === 'hindi' ? "Capture Photo" : "आधार कार्ड की तस्वीर लें"}</p>
              )

              }

            </div>
          </div>

        </div>


        <div className='btn_submit'>
          <button onClick={handleAadharDetails}>
            {language === 'hindi' ? " Submit " : "सबमिट करें "}
          </button>
        </div>

      </div>
     
      <ToastContainer />
      <Button />
    </div>
  );
}

export default AddharNonVerify;

