const Post = require('../Models/Post');
const { get } = require('../routes/userRoutes');



//function for making posts
const makePosts = async(req,res)=>{
  const { title, content, category, tags, threadId  } = req.body;
  const timestamp = new Date();
  const newPost = new Post({
    title,
    content,
    category,
    tags,
    Thread: threadId,
    votes: 0,
    replies: [],
    timestamp
  });

  try {
    const savedPost = newPost.save()
    res.json(savedPost)
  } catch (error) {
    res.status(500).json({message:'error making the post'})
    
  }
 }

 const getPostById = async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts' });
    }
  };






module.exports= {makePosts,getPostById}