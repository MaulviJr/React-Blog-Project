import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state) => state.auth.userData);

  console.log("this is data of user:", authData);

  useEffect(() => {
    service.listPosts().then((posts) => {
      if (posts && posts.rows) {
        setPosts(posts.rows);
      } else {
        setPosts([]);
      }
    });
  }, []);

  // Empty state if logged in but no posts
  if (posts.length === 0 && authStatus) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            No Posts To Read 
          </h1>
        </div>
      </Container>
    );
  }

  // If not logged in
  if (authStatus === false) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            Login to Read Posts 
          </h1>
        </div>
      </Container>
    );
  }

  // Posts grid
  return (
    <Container>
      <div className="py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Latest Posts 
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transition-transform transform hover:scale-105 duration-200"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Home;
