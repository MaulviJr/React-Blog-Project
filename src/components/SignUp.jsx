import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { login as authLogin } from '../store/blogSlice';
import {Button,Input,Logo} from './index.js';
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';

function SignUp() {
const navigate = useNavigate();
const dispatch=useDispatch();
const [error,setError]=useState("");
const {register,handleSubmit}=useForm();

const create = async(data)=>{
    setError("")
    try {
       const userData = await authService.createAccount(data);
       if(userData) {
        const userDataNew=await authService.getLoginStatus(userData);
        if(userDataNew) {
            dispatch(authLogin(userDataNew))
            navigate('/');
        }
       }
    } catch (error) {
        setError(error.message || "Login failed. Please check your credentials and try again.");
    }
}


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {/* Logo (optional) */}
        <div className="flex justify-center mb-6">
          <Logo className="h-12 w-12" />
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">SignUp</h2>

        {/* Error message */}
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{console.log(error)}{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeHolder="Abdul Hadi"
            className="w-full"
            {...register("name", { required: true,
            
             })}
          />
        <Input
                    label="Email"
                    type="email"
                    placeHolder="xyz@xyz.com"
                    className="w-full"
                    {...register("email", { required: true,
                       pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          }
                     })}
                  />

         <Input
                    label="Password"
                    type="password"
                    className="w-full"
                    {...register("password", { required: true })}
                  />
          <Button type="submit" className="w-full">
            SignUp
          </Button>
        </form>
      </div>
    </div>
    );
};

export default SignUp;