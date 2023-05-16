import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    userName: {
        type: String,
        required: true
    },
    attachedFields: {
        type: [String]
    },
    createdDate:{
        type: Date,
        required: true
    }
})

const Post = mongoose.model('Post', PostSchema);
export default Post;