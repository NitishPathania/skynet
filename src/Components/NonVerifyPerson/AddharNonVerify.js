// import React, { useRef, useState, useCallback } from 'react';
// import Navbar from '../Navbar/Navbar';
// import "../NonVerifyPerson/AddharNonVerify.css";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Button from '../BackButton/Button';
// import { api } from "../Api/Api";
// import axios from "axios";
// import Webcam from "react-webcam";
// import { useNavigate } from 'react-router-dom';
// import Swal from "sweetalert2"
// const AddharNonVerify = ({ language }) => {
//   const userPhoto="Images/photologo"
//   const aadharPhoto="Images/aadharlogo"
//   const userImage = localStorage.getItem("userImage");
//   const navigate = useNavigate()
//   const webcamRef = useRef(null); // create a webcam reference
//   const webcamRefaadhar = useRef(null)
//   const [imgSrc, setImgSrc] = useState(userPhoto); // initialize it
//   const [imgSrcAadhar, setImgSrcAadhar] = useState(aadharPhoto)
//   const [retakeUserPhoto, setRetakeUserPhoto] = useState("Take Photo")
//   const [retakeAadharPhoto, setRetakeAadharPhoto] = useState("Capture Aadhar Photo")
//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImgSrc(imageSrc);
//     // localStorage.setItem("userImage", imageSrc)
//     console.log(imageSrc)
//   }, [webcamRef, setImgSrc]);

//   const retake = () => {
//     setImgSrc(null);
//     setRetakeUserPhoto("Retake Photo")
//   };
//   const retakeAadhar = () => {
//     setImgSrcAadhar(null)
//     setRetakeAadharPhoto("Retake Aadhar Photo")
//   }
//   const captureAadhar = useCallback(() => {
//     const imageSrc = webcamRefaadhar.current.getScreenshot();
//     setImgSrcAadhar(imageSrc);
//     // localStorage.setItem("aadharImage", imageSrc)
//   }, [webcamRefaadhar, setImgSrcAadhar]);

//   const handleAadharDetails = () => {
//     // Retrieve data from localStorage
//     const entryName = JSON.parse(localStorage.getItem("entryName"));
//     const purposeData = JSON.parse(localStorage.getItem("purposeData"));
//     const houseDetails = JSON.parse(localStorage.getItem("houseDetails"));
//     // const userImage = localStorage.getItem("userImage");
//     // const aadharImage = localStorage.getItem("aadharImage");

//     if (!entryName) {
//       toast.warn(language === 'hindi' ? "Please Select Entry Type" : "कृपया प्रवेश प्रकार चुनें");
//     } else if (!purposeData) {
//       toast.warn(language === 'hindi' ? "Select the Purpose" : "उद्देश्य चुनें")
//     } else if (!houseDetails) {
//       toast.warn(language === 'hindi' ? "Selected House Details" : "घर के विवरण चुने गए ")
//     }

 
//   // else if (imgSrc==userPhoto) {
//   //     // setRetakePhoto(true)
//   //     toast.warn(language === 'hindi' ? "Please Click the Photo" : "कृपया फोटो क्लिक करें")
//   //   } else if (imgSrcAadhar==aadharPhoto) {
//   //     toast.warn(language === 'hindi' ? "Please Click Aadhar Photo" : "कृपया आधार फोटो क्लिक करें")
//   //   }

//     else {
      
//       localStorage.setItem("userImage", imgSrc)
//       localStorage.setItem("aadharImage", imgSrcAadhar)
//       const userImage = localStorage.getItem("userImage")
//       const aadharImage = localStorage.getItem("aadharImage")
//       if(!userImage){
//         toast.warn(language === 'hindi' ? "Please Click the Photo" : "कृपया फोटो क्लिक करें")
//       }
//       else if(!aadharImage ){
//         toast.warn(language === 'hindi' ? "Please Click Aadhar Photo" : "कृपया आधार फोटो क्लिक करें")
//       }
 
//       const userDetails = {

//         entryName,
//         purposeData,
//         houseDetails: {
//           housename: houseDetails.housename,
//           houseOwner: houseDetails.houseOwner
//         },
//         userImage,
//         aadharImage
//       };
//       localStorage.setItem("userDetails", JSON.stringify(userDetails));
//       Swal.fire({
//         title: `${language === 'hindi' ? "Are you sure?" : "क्या आप सुनिश्चित हैं?"}`,
//         icon: "warning",
//         showCancelButton: true,
//         cancelButtonText: `${language === 'hindi' ? "Cancel" : "रद्द करें"}`,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: `${language === 'hindi' ? "Yes, submit it!" : "हां, इसे सबमिट करें!"}`

//       }).then((result) => {
//         if (result.isConfirmed) {
//           axios.post(`${api}nonVerify`, userDetails)
//             .then((res) => {
//               console.log('Response:', res.data);
//               toast.success(language === 'hindi' ? "Details added Successfully" : "विवरण सफलतापूर्वक जोड़ा गया!");
//               window.localStorage.clear();
//               setTimeout(() => {
//                 navigate("/")
//               }, 3000);
//             })
//             .catch((error) => {
//               console.error('Error:', error);
//             });




//         } else {


//           toast.warn(language === 'hindi' ? "Your Data is not submitted" : "आपके डेटा को सबमिट नहीं किया गया है।");

//         }
//       });





//     }
//   }

//   return (
//     <div>

//       <div className="screen">

//         <div className="main_verification">
//           <div className="main_photo_verification" >

//             {imgSrc ? (
//               <img src={imgSrc} className='img_top' alt="webcam" />
//             ) : (
//               <div className='webcammaindiv'>

//                 <Webcam className='webcam' ref={webcamRef} videoConstraints={{ facingMode: 'user' }} />

//               </div>
//             )}
//             <div className='verification_content'>

//               {imgSrc ? (
//                 <p onClick={retake}>
//                   {language === 'hindi' ? <>{retakeUserPhoto}</> : "फोटो लें "}
//                 </p>
//               ) : (
//                 <p onClick={capture}> {language === 'hindi' ? " Capture Photo " : "तस्वीर लें"}</p>
//               )
//               }
//             </div>
//           </div>

//           <div className="main_aadhar_verification">

//             {imgSrcAadhar ? (
//               <img src={imgSrcAadhar} className='img_top' alt="webcam" />
//             ) : (

//               <div className='webcammaindiv_aadhar'>
//                 <Webcam className='webcam' ref={webcamRefaadhar} videoConstraints={{ facingMode: 'environment' }} />
//               </div>

//             )}
//             <div className='verification_aadhar_content' >

//               {imgSrcAadhar ? (
//                 <p onClick={retakeAadhar}>{language === 'hindi' ? <>{retakeAadharPhoto}</> : "फोटो लें "}</p>
//               ) : (
//                 <p onClick={captureAadhar}> {language === 'hindi' ? "Capture Photo" : "आधार कार्ड की तस्वीर लें"}</p>
//               )

//               }

//             </div>
//           </div>

//         </div>


//         <div className='btn_submit'>
//           <button onClick={handleAadharDetails}>
//             {language === 'hindi' ? " Submit " : "सबमिट करें "}
//           </button>
//         </div>

//       </div>

//       <ToastContainer />
//       <Button />
//     </div>
//   );
// }

// export default AddharNonVerify;




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
import Swal from "sweetalert2"
const AddharNonVerify = ({ language }) => {
  // const userPhoto = "Images/photologo"
  // const aadharPhoto = "Images/aadharlogo"
  const userImage = localStorage.getItem("userImage");
  const navigate = useNavigate()
  const webcamRef = useRef(null); // create a webcam reference
  const webcamRefaadhar = useRef(null)
  const [imgSrc, setImgSrc] = useState("Images/photologo"); // initialize it
  const [imgSrcAadhar, setImgSrcAadhar] = useState("Images/aadharlogo")
  const [retakeUserPhoto, setRetakeUserPhoto] = useState(" Click a photo")
  const [retakeUserPhotoHindi, setRetakeUserPhotoHindi] = useState("  फोटो क्लिक करें" )
  const [retakeAadharPhoto, setRetakeAadharPhoto] = useState("Click Aadhar card photo")
  const [retakeAadharPhotoHindi, setRetakeAadharPhotoHindi] = useState("आधार कार्ड की फोटो खींचें।")
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // localStorage.setItem("userImage", imageSrc)
    console.log(imageSrc)
  }, [webcamRef, setImgSrc]);

  const retake = () => {
    setImgSrc(null);
    setRetakeUserPhoto("Retake Photo")
    setRetakeUserPhotoHindi("फिर से फोटो ले")
  };
  const retakeAadhar = () => {
    setImgSrcAadhar(null)
    setRetakeAadharPhoto("Retake Aadhar Photo")
    setRetakeAadharPhotoHindi("आधार कार्ड की फिर से तस्वीर लें")
  }
  const captureAadhar = useCallback(() => {
    const imageSrc = webcamRefaadhar.current.getScreenshot();
    setImgSrcAadhar(imageSrc);
  }, [webcamRefaadhar, setImgSrcAadhar]);

  const handleAadharDetails = () => {

    const entryName = JSON.parse(localStorage.getItem("entryName"));
    const purposeData = JSON.parse(localStorage.getItem("purposeData"));
    const houseDetails = JSON.parse(localStorage.getItem("houseDetails"));
    if (!entryName) {
      toast.warn(language === 'hindi' ? "Please Select Entry Type" : "कृपया प्रवेश प्रकार चुनें");
    } else if (!purposeData) {
      toast.warn(language === 'hindi' ? "Select the Purpose" : "उद्देश्य चुनें")
    } else if (!houseDetails) {
      toast.warn(language === 'hindi' ? "Selected House Details" : "घर के विवरण चुने गए ")
    }
    else if (imgSrc === "Images/photologo" || imgSrc && imgSrc.length < 20 || !imgSrc) {
      toast.warn(language === 'hindi' ? "Please Click the Photo" : "कृपया फोटो क्लिक करें")
    }
    else if (imgSrcAadhar === "Images/aadharlogo" || imgSrcAadhar && imgSrcAadhar.length < 50 || !imgSrcAadhar) {
      toast.warn(language === 'hindi' ? "Please Click Aadhar Photo" : "कृपया आधार फोटो क्लिक करें")
    }
    else {
      Swal.fire({
        title: `${language === 'hindi' ? "Are you sure?" : "क्या आप सुनिश्चित हैं?"}`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: `${language === 'hindi' ? "Cancel" : "रद्द करें"}`,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${language === 'hindi' ? "Yes, submit it!" : "हां, इसे सबमिट करें!"}`

      }).then((result) => {
        localStorage.setItem("userImage", imgSrc)
        localStorage.setItem("aadharImage", imgSrcAadhar)
        const userImage = localStorage.getItem("userImage")
        const aadharImage = localStorage.getItem("aadharImage")
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
        if (result.isConfirmed) {
          axios.post(`${api}nonVerify`, userDetails)
            .then((res) => {
              console.log('Response:', res.data);
              toast.success(language === 'hindi' ? "Details added Successfully" : "विवरण सफलतापूर्वक जोड़ा गया!");
              window.localStorage.clear();
              setTimeout(() => {
                navigate("/")
              }, 3000);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }


        else {


          toast.warn(language === 'hindi' ? "Your Data is not submitted" : "आपके डेटा को सबमिट नहीं किया गया है।");

        }



      })




    }




  }
  

  return (
    <div>

      <div className="screen">

        <div className="main_verification">
          <div className="main_photo_verification" >

            {imgSrc ? (
              <img src={imgSrc} className='img_top' alt="webcam" />
            ) : (
              <div className='webcammaindiv'>

                <Webcam className='webcam' ref={webcamRef} />

              </div>
            )}
            <div className='verification_content'>

              {imgSrc ? (
                <p onClick={retake}>
                  {language === 'hindi' ? <>{retakeUserPhoto}</> : <>{retakeUserPhotoHindi}</>}
                </p>
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
                <p onClick={retakeAadhar}>{language === 'hindi' ? <>{retakeAadharPhoto}</> :<>{retakeAadharPhotoHindi}</> }</p>
              ) : (
                <p onClick={captureAadhar}> {language === 'hindi' ? "Capture Aadhar Card Photo" : "आधार कार्ड की तस्वीर लें"}</p>
              )
              // "आधार कार्ड की फोटो फिर से लें"
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




