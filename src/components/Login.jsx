import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin } from '../store/blogSlice';
import { Button, Input, Logo } from './index.js';
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  
  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getLoginStatus() // the name of function is probably not very suitable
        if (userData) {
          dispatch(authLogin({userData}));
          console.log("1. I dispatch data: login.jsx ", userData)
          navigate('/');

          
        }
      }
    } catch (error) {
      setError(error.message || "Login failed. Please check your credentials and try again.");
    }
  }

const userData=useSelector(state=>state.auth.userData);
console.log("checking login.jsx: ", userData);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {/* Logo (optional) */}
        <div className="flex justify-center mb-6">
          <Logo className="h-12 w-12" />
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Login</h2>

        {/* Error message */}
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            className="w-full"
            {...register("email", {
              required: true,
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
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;