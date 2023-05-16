import { response } from "express";
import Comment from "../models/comment.js";

export const postComment = async(req,res,next) => {
    try{
        console.log(req.body, 'reached')
       const comment = await new Comment(req.body);
       console.log(comment)
       await comment.save();
        
       return res.status(200).json({
        msg: 'comment saved successfully'
       })
    }catch(error){
        return res.status(500).json({
            error: error
        })
    }
}

export const getAllComments = async(req,res,next) => {
    try{
       const comments = await Comment.find({postId: req.params.id}).sort({date: -1});

       return res.status(200).json({
            comments: comments
       })
    }catch(error){
        return res.status(500).json({
            error: error
        })
    }
}


export const deleteComment = async(req,res,next)=>{
    console.log('from deleteComment function')
    console.log(req.params.id)
    try{
        await Comment.findByIdAndDelete(req.params.id) 

        res.status(200).json({
            msg: 'post deleted successfully'
        })
    }catch(error){
        res.status(500).json({
            error: error
        })
    }
}