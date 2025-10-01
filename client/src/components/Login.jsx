import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa6";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {

  const [values,setValues] = useState({
    email:'',
    password:''
  });
  
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8081/auth/login',values)
        .then(res => {
           if(res.data.Status === "Success"){
             navigate('/dashboard');
           }
           else{
            alert(res.data.message);
           }
        })
        .catch((err) => {
          console.log(err);
        });
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8081/auth/google";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e)=> setValues({...values,email:e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setValues({...values,password:e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>
      <div className="mt-6 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Or</span>
      </div>
      <div className="mt-4">
        <button
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center"
          onClick={handleGoogleLogin}
        >
         {<FaGoogle className="mr-2" />}
           Sign In with Google
        </button>
      </div>
    </div>
  </div>
  )
}

export default Login