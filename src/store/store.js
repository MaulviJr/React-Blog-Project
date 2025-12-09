import { configureStore } from '@reduxjs/toolkit';
import { blogSlice } from './blogSlice';
import { postSlice } from './postSlice';
const store = configureStore({
    reducer: {
       auth: blogSlice.reducer, 
        post: postSlice.reducer,
    }
});

export default store;