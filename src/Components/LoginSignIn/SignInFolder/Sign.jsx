import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Sign.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { api } from '../../Api/Api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Sign = () => {
  const navigate=useNavigate()
  const initialValues = {
    username: '',
    userPhoneNo: '',
    password: ''
  };
 
  const validationSchema = Yup.object().shape({
    username: Yup.string()
    .required('Username is required')
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
          toast.success(res.data.msg);
          setTimeout(()=>{
            navigate("/login")
          },1500)
       
        } else if (res.status === 400) {
          toast.error("User Already Exist");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("User Already Exist");
      });
  };
  
  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="userPhoneNo">Phone</label>
              <Field type="text" id="userPhoneNo" name="userPhoneNo" />
              <ErrorMessage name="userPhoneNo" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>Sign Up</button>
            <div className='bottom_content'>

            <p>
              Already SignUp ?<Link to="/login">Login</Link>
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
