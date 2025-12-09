import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/blogSlice';


function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler =()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }

    return (
     <button
      onClick={logoutHandler}
      className="px-4 py-2 rounded-md bg-blue-500
       text-white font-medium hover:bg-blue-600 
       transition duration-200 shadow-md"
    >
      Logout
    </button>
    );
};

export default LogoutBtn;