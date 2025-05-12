import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../store/userReducer.js'
import PostReducer from '../store/postReducer.js'

let store = configureStore({
    reducer : {
        user : userReducer,
        post : PostReducer
    }
})

export default store