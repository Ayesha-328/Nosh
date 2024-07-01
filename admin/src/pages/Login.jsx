import React, { useState } from 'react'
import { assets } from '../assets/assets'
import {useLocation, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

const Login = ({url,login}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {setUser} = useContext(UserContext)
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("idle")
    const[formData,setFormData] = useState({
        email:"",
        password:""
    })
    const authState = location.state?.message;
    const path=location.state?.path;

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
            setStatus("submitting")
            const response = await axios.post(`${url}/login`, {
                email: formData.email,
                password: formData.password
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.token); // Store the token
                // console.log(response.data.token)
                setUser(response.data.user)
                setError(null)
                login()
                navigate(path ? path : "/", { replace:true })
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.error)
                toast.error(error.response.data.error);
            } else {
                toast.error("Oops! There was an error while logging in. Please try again.");
            }
        }
        finally{
            setFormData({
                email:"",
                password:""
                    })
            setStatus("idle")
        }
    };

    



    
  return (
    <div className="register-container">
        <form className='register-form' onSubmit={handleSubmit}>
            <img src={assets.admin_login_icon} alt="admin" />
        <h3>Login Admin</h3>
        {error?.message && <h4>{error.message}</h4>}
            <input  value={formData.email} 
            onChange={handleChange} type="email" name="email" required placeholder='Email' />
            <input value={formData.password} 
            onChange={handleChange} type="password" name="password" required  placeholder='password'/>
            <button type='submit' className="btn register-btn">{status === "submitting" ? "Logging in" : "Log in"}</button>
            <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
        </form>
    </div>
  )
}

export default Login