import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export let createUser = createAsyncThunk('user/createUser' , async (userData,{rejectWithValue})=>{
    try {
        let res = await axios.post(`${import.meta.env.VITE_SERVER}/api/user/create` , userData)
        return res.data
    } catch (error) {
        return rejectWithValue(error.message || 'due to api error site not work')
    }
})


export let LoginUser = createAsyncThunk('user/LoginUser' , async(userData , {rejectWithValue})=>{
    try {
        let res = await axios.post(`${import.meta.env.VITE_SERVER}/api/user/login` , userData)
        localStorage.setItem(`${import.meta.env.VITE_JWT}`, res.data.token); // Store token
        localStorage.setItem(`${import.meta.env.VITE_USERNAME}` , res.data.user.name) //Store username
        return res.data
    } catch (error) {
        return rejectWithValue(error || 'due to error login page not work')
    }
})

let userReducer = createSlice({
    name : 'user',
    initialState : {
        loading : false ,
        data : null,
        error : null,
        token : localStorage.getItem(`${import.meta.env.VITE_JWT}`) || null,
        // token : null,
        username : localStorage.getItem(`${import.meta.env.VITE_USERNAME}`) || null,
    },
    reducers : {
        logout(state){
            // state.token = null,
            state.token = localStorage.removeItem(`${import.meta.env.VITE_JWT}`),
            state.username = localStorage.removeItem(`${import.meta.env.VITE_USERNAME}`)
            // state.username = null
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(createUser.pending, (state)=> {
            state.loading = true
        })
        .addCase(createUser.fulfilled, (state , action)=> {
            state.loading = false,
            state.data = action.payload,
            state.error = null        
        })
        .addCase(createUser.rejected , (state, action)=> {
            state.loading = false,
            state.error = action.error
        })
        .addCase(LoginUser.pending , (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(LoginUser.fulfilled , (state)=>{
            state.loading = false
            state.token = localStorage.getItem(`${import.meta.env.VITE_JWT}`)
            state.username = localStorage.getItem(`${import.meta.env.VITE_USERNAME}`)
        })
        .addCase(LoginUser.rejected , (state,action)=>{
            state.loading = false ,
            state.error = action.payload
        })
    }
})


export const  { logout } = userReducer.actions
export default userReducer.reducer

