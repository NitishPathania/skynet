import React from 'react'
import {Link} from "react-router-dom"
import { IoPlaySkipBackCircle } from "react-icons/io5";
import {useNavigate} from "react-router-dom"
import "../BackButton/Button.css"
import { IoArrowBackCircleSharp } from "react-icons/io5";
const Button = () => {
    const navigate=useNavigate()
  return (
    <div className='btn_div'>
    <span onClick={()=>navigate(-1)}><IoArrowBackCircleSharp /></span>
    </div>
  )
}

export default Button