import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

export const authenticateToken = (req,res,next) => {

   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];

   if(token == null){
    return res.status(401).json({
        msg: 'token is missing'
    })
   }else{
    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (error, user) => {
        if(error){
            return res.status(403).json({
                msg: 'Invalid token'
            })
        }else{
            req.user = user;
            console.log('all is good, running the next function after jwt auth')
            next();
        }
}) 
   }  
}