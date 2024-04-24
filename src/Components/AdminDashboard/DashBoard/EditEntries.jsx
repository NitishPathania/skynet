import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../../Api/Api';
import axios from 'axios';
import "../DashBoard/DashBoard.css"
import { ToastContainer,toast } from 'react-toastify';
const EditEntries = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    titleEnglish: Yup.string().required('Entry Type English is required'),
    titleHindi: Yup.string().required('Entry Type Hindi is required'),
    icon: Yup.string().required('Add Icon is required'),
  });

  const id = JSON.parse(localStorage.getItem('editTypeEntry'));

  const formik = useFormik({
    initialValues: {
      titleEnglish: '',
      titleHindi: '',
      icon: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`${api}editEntry/${id}`, values).then((res)=>{
          alert("Update SuccessFully")
        })
       
        // Handle success, e.g., show a success message or update state
      } catch (error) {
        console.log('Error editing entry:', error);
        // Handle error, e.g., show an error message or handle retry logic
      }
    },
  });

  useEffect(() => {
    const getTypeEntry = async () => {
      try {
        const res = await axios.get(`${api}editEntry/${id}`);
        console.log('Fetched data:', res.data); // Check if data is fetched correctly
        formik.setValues(res.data); // Set formik values directly
      } catch (error) {
        console.log('Internal Server Error:', error);
      }
    };

    getTypeEntry();
  }, [id, formik.setValues]);

  return (
    <div>
      <Button className='modal_Edit_button' onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 700 }}>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="entryTypeEnglish" className='entryType'>Entry Type Hindi</label>
              <input
                type="text"
                id="entryTypeEnglish"
                name="titleEnglish"
                value={formik.values.titleEnglish}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.titleEnglish && formik.errors.titleEnglish ? (
                <div className="error">{formik.errors.titleEnglish}</div>
              ) : null}

              <label htmlFor="entryTypeHindi" className='entryType'>Entry Type English</label>
              <input
                type="text"
                id="entryTypeHindi"
                name="titleHindi"
                value={formik.values.titleHindi}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.titleHindi && formik.errors.titleHindi ? (
                <div className="error">{formik.errors.titleHindi}</div>
              ) : null}

              <label htmlFor="entryIcon" className='entryType'>Add Icon</label>
              <input
                type="text"
                id="entryIcon"
                name="entryIcon"
                value={formik.values.icon}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.icon&& formik.errors.icon? (
                <div className="error">{formik.errors.icon}</div>
              ) : null}

              <button type="submit">Add Type Of Entry</button>
            </form>
          </div>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
      <ToastContainer/>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default EditEntries;
