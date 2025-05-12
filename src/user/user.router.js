import { createUser , loginUser } from './user.controller.js';
import express from 'express';

let router = express.Router();


router.post('/api/user/create', createUser);
router.post('/api/user/login', loginUser);

export default router;
