import User from "./user.model.js";
import bycrypt from "bcrypt";
import  jwt from "jsonwebtoken";

let createUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let encyptedPassword = await bycrypt.genSalt(10);
        let hashPassword = await bycrypt.hash(password, encyptedPassword);
        // Check if the user already exists
        let existingUser = await User.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }else{   
            let newUser = await User.create({
                name,
                email,
                password : hashPassword
            })       
            await newUser.save();
           return res.status(201).json({ message: "Account created successfully! You will now be redirected to the login page.", user: newUser });
        }

    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
}

let loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let isExistingUser = await User.findOne({ email });
        if(!isExistingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        
        let isPasswordMatch = await bycrypt.compare(password , isExistingUser.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        let token = jwt.sign({ user : isExistingUser} , process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful! You are now being redirected now", user: isExistingUser , token: token });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in user"  , error: error.message });
    }
}


export { createUser  , loginUser };



