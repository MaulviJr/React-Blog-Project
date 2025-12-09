
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import { login,logout } from './store/blogSlice.js';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { fetchPosts } from './store/postSlice.js';


function App() {
// we have to check whether user is logged in or not
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();
  const dispatchPosts=useDispatch();
  useEffect(()=>{
    authService.getLoginStatus()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
        console.log("app.jsx:",userData)
      }else {
        dispatch(logout())
      }
    }).catch((error) => {
      // console.error('Error checking login status:', error);
       dispatch(logout())
      //  console.log('hello')
    })
        .finally( ()=>{
      setLoading(false)
    }
    )

  },[])

  useEffect(()=>{
    dispatch(fetchPosts())
  },[])

if (loading) {
  return <div>Loading...</div>;
} else {
  return ( <div className="flex flex-col min-h-screen">
    <Header/>
    <main className="flex-grow">
    <Outlet/>
      </main>
    <Footer/>
    </div>
  )
}
}

export default App
