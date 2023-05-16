import user from "../models/user.js";
import User from "../models/user.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import Token from "../models/token.js";


dotenv.config()

export const signup_POST = async (req,res,next) => {
    try{
        const encrytedPassword = await bcrypt.hash(req.body.password, 10)
        const userRef = req.body;
        userRef.password = encrytedPassword;
        const user = new User(userRef);
        await user.save()
        return res.status(200).json({
            message: 'Signup was successful'
        })
    }catch{
        return res.status(500).json({
            message: 'error while signup the user'
        })
    }
} 


export const login_POST = async (req,res,next) => {
    try{
        let user = await User.findOne({userName: req.body.userName})
        if(!user){
            return res.status(400).json({
                msg: 'userName does not match'
            })
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.SECRET_ACCESS_KEY, {expiresIn: '60m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);


            const newToken = new Token({token: refreshToken});
            await newToken.save()

            return res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                email: user.email,
                userName: user.userName
            })
        }else{
            return res.status(400).json({
                msg: 'Password does not match'
            })
        }  
    }catch(error){
        return res.status(500).json({
            msg: 'Error while login in user'
        })
    }
}