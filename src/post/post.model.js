import mongoose  from "mongoose";

let postSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    imgUrl : {
        type: String,
        required: true
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

let Post = mongoose.model('Post', postSchema);
export default Post;