import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comment: {
        type: String, 
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;