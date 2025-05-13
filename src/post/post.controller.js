import Post  from "./post.model.js";


let createPost = async (req, res) => {
    try {
        let {user} = req.user;
        if(!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        let { title , imgUrl  } = req.body;
        let newPost = new Post({
            title,
            imgUrl,
            userID: user._id
        });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
        
    } catch (error) {
        res.status(500).json({ message: "Error creating post" , error: error.message });
    }
}

let fetchPost = async (req,res)=> {
    try {
        let Posts = await Post.find({})

        res.json({
            post : Posts,
            message : 'all post fetch successfully'
        })
        
    } catch (error) {
        res.json({
            message : `${error.message} arrived`,
            status : 400
        })

    }
}

export { createPost , fetchPost };

