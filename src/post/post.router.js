import express from 'express'
import { createPost , fetchPost } from './post.controller.js'
import isLogin from '../../middleware/auth.js'


let router = express.Router()


router.post('/api/post/create',isLogin, createPost)
router.get('/api/post',isLogin,fetchPost)

export default router 
