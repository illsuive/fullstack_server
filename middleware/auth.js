import jwt from "jsonwebtoken";

let isLogin = (req, res, next) => {
    try {
       let { token } = req.headers;
         if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
          }
          let user = jwt.verify(token, process.env.JWT_SECRET); 
          req.user = user;
        // console.log(user);
          next(); 
    } catch (error) {
        return res.status(401).json({ message: "error during login" });
        
    }
}



export default isLogin;