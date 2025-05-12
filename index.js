import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './database/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'

import postRoute from './src/post/post.router.js'
import userRoute from './src/user/user.router.js'

let app = express();
app.use(cors({
    origin : 'http://localhost:5173',
    optionsSuccessStatus : 200
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use( '/' , userRoute)
app.use( '/' , postRoute)



app.get('/', (req, res) => {
    res.send('welcome to the home page');
})




app.listen(3000, () => {
    console.log('Server is running on port 3000');
    connectDB();
})
