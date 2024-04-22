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
const Login = () => {
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
     
      toast.success(res.data.msg);
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
      toast.error(" Invalid phone number or password");
    }

  };
  return (
    <div className="signup-form-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form">

            <div className="form-group">
              <label htmlFor="userPhoneNo">PhoneNo</label>
              <Field type="text" id="userPhoneNo" name="userPhoneNo" />
              <ErrorMessage name="userPhoneNo" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>Login</button>
            <div className='bottom_content'>
            <p>
              New User ?<Link to="/signUp">Register now</Link>
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
