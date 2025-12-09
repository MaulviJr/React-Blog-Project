import React from 'react';
import { useState,useEffect } from 'react';
import service from '../appwrite/config';
import { Container,PostCard } from '../components';
import { useSelector } from 'react-redux';


function AllPosts() {

  const [posts, setPosts] = useState([]);
  const postGet=useSelector((state)=>state.post.posts);

  // console.log("the post in  store: ", postGet)

  // useEffect(() => {
  //   // console.log("i am in all posts")
  //   service.listPosts().then((posts) => {
  //     if (posts && posts.rows) {
       
  //       // console.log(posts);
  //       setPosts(posts.rows);
  //     } else {
  //       setPosts([]);
  //     }
  //   });
  // },[]); // <-- add dependency array to avoid infinite loop

  useEffect(()=>{
  // const postGet=useSelector((state)=>state.post.posts);
  if(postGet) {
    setPosts(postGet)
  } else {
    setPosts([])
  }
  },[])

  console.log("new post from post get: ", posts)

// console.log(service.listPosts().then((post)=>post.rows))
  return (
    <div className="py-8">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
           
            <PostCard key={post.$id} {...post} />
          ))
          }
        </div>
      </Container>
    </div>
  );
}


export default AllPosts;