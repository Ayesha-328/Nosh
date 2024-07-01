import React, { useState } from 'react'
import "./register.css"
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register = ({url}) => {
    const navigate = useNavigate();
    const[formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    })


    const handleChange =(e)=>{
        e.preventDefault();
        const {name,value} = e.target;
        setFormData(prevFormData=>({
            ...prevFormData,
            [name]:value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            if (response.status === 200) {
                toast.success("You have been successfully registered as an admin. Please login.");
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Oops! There was an error while registering. Please try again.");
            }
        }
        finally{
            setFormData({
                name: "",
                email: "",
                password: ""
            });
            
        }
    }
    
  return (
    <div className="register-container">
        <form className='register-form' onSubmit={handleSubmit}>
            <img src={assets.admin_icon} alt="admin" />
        <h3>Register Admin</h3>
            <input
            value={formData.name} 
            onChange={handleChange}
            type="text" name="name" required placeholder='Name' />
            <input  value={formData.email} 
            onChange={handleChange} required type="email" name="email" placeholder='Email' />
            <input value={formData.password} 
            onChange={handleChange} required type="password" name="password"  placeholder='password'/>
            <button type='submit' className="btn register-btn">Register</button>
        </form>
    </div>
  )
}

export default Register