import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let url = process.env.DB_URL

let connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to database successfully");
        
    } catch (error) {
        console.log("Error connecting to database: ", error);
        
    }
}

export default connectDB;