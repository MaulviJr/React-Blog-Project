import React from "react";
import { useEffect,useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";


function EditPost() {
const [post,setPost] =useState([])
const navigate= useNavigate()
const {slug}=useParams();

useEffect(()=>{
    if(slug) {
        service.getPost(slug).then((post)=>{
            setPost(post)
            console.log("check post edit.jsx",post)
        })
    } else {
        navigate('/')
    }


},[slug,navigate])

    return (
       <div className='py-8'>
        <Container>
        <PostForm post={post} />
        </Container>
       </div>
    )
}

export default EditPost