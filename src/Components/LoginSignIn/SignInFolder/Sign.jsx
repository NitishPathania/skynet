import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Sign.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { api } from '../../Api/Api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Sign = ({ language }) => {
  const [updateLangage, setUpdateLanguage] = useState(language)
  const navigate = useNavigate()
  const initialValues = {
    username: '',
    userPhoneNo: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()

      .required("Username is required")
      .matches(/^[a-zA-Z\s]*$/, 'Username should not contain numbers'),
    userPhoneNo: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{1,10}$/, 'Phone number should be up to 10 digits'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
  });
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);

    axios.post(`${api}signup`, values)
      .then((res) => {
        if (res.data.success === true) {


          toast.success(` ${language === 'hindi' ? `${res.data.msg}` : "उपयोगकर्ता सफलतापूर्वक बनाया गया"}`);
          setTimeout(() => {
            navigate("/login")
          }, 1500)

        } else if (res.status === 400) {
          toast.error(` ${language === 'hindi' ? "User Already Exist" : "उपयोगकर्ता पहले से मौजूद है"}`);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("User Already Exist");
      });
  };
  useEffect(() => {
    setUpdateLanguage(language); // Update updateLangage when language changes
  }, [language]);
  return (
    <div className="signup-form-container">
      <h2> {language === 'hindi' ? "Sign Up" : "साइन अप"}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form">
            <div className="form-group">
              <label htmlFor="username">{language === 'hindi' ? "Username" : "उपयोगकर्ता नाम"}</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="userPhoneNo">{language === 'hindi' ? "PhoneNo" : "फ़ोन नंबर"}</label>
              <Field type="text" id="userPhoneNo" name="userPhoneNo" />
              <ErrorMessage name="userPhoneNo" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password"> {language === 'hindi' ? "Password" : "पासवर्ड"}</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>{language === 'hindi' ? "Sign Up" : "साइन अप"}</button>
            <div className='bottom_content'>

              <p>

                {language === 'hindi' ? "Already SignUp ?" : "पहले से ही रजिस्टर्ड है?"}
                <Link to="/login">{language === 'hindi' ? "Login" : "लॉगिन"}</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Sign;
