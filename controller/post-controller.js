import { ObjectId } from "mongodb";
import Post from "../models/post.js "
import mongoose from "mongoose";

export const createPost = async(req,res,next)=> {

    console.log('galat jagah kyun aa rha hai')

    console.log(req.body)

    try{
        const post = await new Post(req.body);
        await post.save()

        return res.status(200).json({
            msg: "post created successfully"
        })
    }catch(error){
       res.status(500).json({
        msg: error
       })
    }

}

//db.myCollection.find({ "hobbies": { "$in": hobbiesArray } });

export const getPosts = async(req,res,next)=>{
    try{
          const selectedFields = req.body.selectedFields.split(',')
          console.log(selectedFields)
          let posts = req.body.selectedFields.length === 0 ? await Post.find().sort({createdDate: -1}) : 
          await Post.find({
            "attachedFields": { 
                "$exists": true,
                "$elemMatch": { "$in": selectedFields }
            }
        }
            // {   
            //         "attachedFields": { "$elemMatch": { $in: [...selectedFields]} } 
            //   }
            ).sort({createdDate: -1});
        return res.status(200).json({
            posts
        })
    }catch(error){
        return res.status(500).json({
            error: error
        })
    }
}


export const getPostById = async(req,res,next)=>{

    console.log(req.body)

    try{
        const post = await Post.findById(req.params.id );

        return res.status(200).json({
            post,
            msg: 'post sent successfully'
        })
    }catch(error){
        return res.status(500).json({
            msg: error.message
        })
    }
}

export const updatePost = async(req,res,next) =>{

    console.log('ok here to update')
    console.log(req.body)

    try{

        const post = await Post.findById(req.body._id);

        console.log(post)

        if(!post){
            return res.status(404).json({
                msg: 'post not found'
            })
        }

        // const formData = req.body.formData;

        // console.log('formdata', formData)

        // const title = formData.get("title");
        // console.log(title)
        // const updateData = {};
        
        // for (const [key, value] of formData.entries()) {
        // updateData[key] = value;
        // }

        // console.log('till here')

        // console.log(updateData, 'data to update')

        await Post.updateOne({_id:  req.body._id}, {$set : req.body})

        return res.status(200).json({
            msg: 'Post updated successfully'
        })
    }catch(error){
        res.status(500).json({
            error: error
        })
    }
}

export const deletePost = async(req,res,next)=>{
    try{

        await Post.findByIdAndDelete(req.params.id) 
        // const post = await Post.findById(req.params.id);

        // console.log(post)

        // if(!post){
        //     return res.status(404).json({
        //         msg: "Post not found"
        //     })
        // // }
        // await post.delete()

        console.log('deleted')

        return res.status(200).json({
            msg: 'post deleted successfully'
        })
    }catch(error){
        return res.status(500).json({
            error: error
        })
    }   
}