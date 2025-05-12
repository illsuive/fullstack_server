import { createSlice , createAsyncThunk}  from '@reduxjs/toolkit'
import axios from 'axios';
// import {useDispatch , useSelector} from 'react-redux'
    

export let fetchPost = createAsyncThunk('post/fetchPost' , async(token, {rejectWithValue})=>{
    try {
        let res = await axios.get(`${import.meta.env.VITE_SERVER}/api/post` , {
            headers : { token }
        })
        return res.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.meaage || `error arise during server`)
        
    }
})
//  work herre
let PostReducer = createSlice({
    name : 'posts',
    initialState : {
        loading : false ,
        data : [],
        error : null ,
    },
    reducers : {}, 
    extraReducers  : (builder)=>{
        builder
        .addCase(fetchPost.pending , (state)=>{
            state.loading = true
        })
        .addCase(fetchPost.fulfilled , (state , action)=>{
            state.loading = false,
            state.data = action.payload.post,
            state.error = null
        })
        .addCase(fetchPost.rejected , (state ,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default PostReducer.reducer

