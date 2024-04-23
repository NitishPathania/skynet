import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { api } from '../../Api/Api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login = ({language}) => {
  const navigate = useNavigate()
  const initialValues = {

    userPhoneNo: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({

    userPhoneNo: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{1,10}$/, 'Phone number should be up to 10 digits'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);

    try {
      const res = await axios.post(`${api}login`, values);
     
      toast.success( `${language === 'hindi' ? `${res.data.msg}` : " उपयोगकर्ता लॉगिन सफलतापूर्वक"}`);
      const token = {
        userPhoneNo: values.userPhoneNo,
        password: values.password
      };
      
      localStorage.setItem('token', JSON.stringify(token));

      setTimeout(()=>{
        navigate("/nonVerifyUser")
      },1500)
     
    }
    catch (err) {
      toast.error(`${language === 'hindi' ? "Invalid phone number or password" : "अमान्य फोन नंबर या पासवर्ड"}`);
    }

  };
  return (
    <div className="signup-form-container">
      <h2>{language === 'hindi' ? "Login" : "लॉगिन"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form">

            <div className="form-group">
              <label htmlFor="userPhoneNo">{language === 'hindi' ? "PhoneNo" : "फ़ोन नंबर"}</label>
              <Field type="text" id="userPhoneNo" name="userPhoneNo" />
              <ErrorMessage name="userPhoneNo" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">{language === 'hindi' ? "Password" : "पासवर्ड"}</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>{language === 'hindi' ? "Login" : "लॉगिन"}</button>
            <div className='bottom_content'>
            <p>                                                    
            {language === 'hindi' ? " New User ?" :"नया उपयोगकर्ता?"} <Link to="/signUp"> {language === 'hindi' ? "Register now" :"अब रजिस्टर करें"} </Link>
            </p>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Login;
