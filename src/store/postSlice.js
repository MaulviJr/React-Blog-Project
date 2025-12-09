import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/config";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const posts = await service.listPosts([]);
  return posts.rows; 
});

export const addPosts = createAsyncThunk("posts/addPosts", async (post)=>{
  const newPost =  await service.createPost(post)
  return newPost;
})

export const delPosts = createAsyncThunk("posts/delPosts",async (postId)=>{
    await service.deletePost(postId)
    return postId; // should return slug
})

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        if(state.loading) {
          console.log("posts loading")
        }
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        //  if(!state.loading) {
        //   console.log("posts fetched")
        // }
        console.log("i am payload: ", action.payload)
        // console.log(typeof action.payload)
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPosts.pending,(state,action)=>{
           console.log("store addPosts Pendng: ")
      })
      .addCase(addPosts.fulfilled,(state,action)=>{
    state.posts.push(action.payload);
      })
      .addCase(delPosts.fulfilled,(state,action)=>{
        console.log("checking delPost slug: ", action.payload);
        state.posts.filter(post=>post.slug!==action.payload);
      });
  },
});

export default postSlice.reducer;
