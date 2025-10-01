import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa6";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function SignUp() {
   
   const [values,setValues] = useState({
     name:'',
     email:'',
     device_id:'',
     password:'',
     phone_num:'',
     relative_num:''
   });

   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
      
      axios.post('http://localhost:8081/auth/signup',values)
       .then( (res) => {

          if(res.data.Status === "Already a user"){
             alert("Already a user,Click ok to go to login");
             navigate('/login');
          }
          else if(res.data.Status === "Success"){
            alert("Registered successfully,Please OK to Login");
            navigate('/login');
          }
          else{
            alert("Error in adding,please try again");
          }
       })
       .catch((err)=> console.log(err));
   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              onChange={(e) => setValues({...values,name:e.target.value})}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setValues({...values,email:e.target.value})}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="devid" className="block text-sm font-medium text-gray-600">Device_id</label>
            <input
              type="text"
              id="devid"
              placeholder="Enter your device id"
              onChange={(e) => setValues({...values,device_id:e.target.value})}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              onChange={(e) => setValues({...values,password:e.target.value})}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="usernum" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              id="usernum"
              placeholder="Enter your phone number"
              onChange={(e) => setValues({...values,phone_num:e.target.value})}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="relno" className="block text-sm font-medium text-gray-600">Relative Number</label>
            <input
              type="text"
              id="relno"
              placeholder="Enter your primary relative number"
              onChange={(e) => setValues({...values,relative_num:e.target.value})}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
          
        </form>
       
      </div>
    </div>
  )
}

export default SignUp