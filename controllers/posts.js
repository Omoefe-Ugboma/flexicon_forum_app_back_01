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
    const postId = req.params.id;
    try {
      const post = await Post.findById(postId);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching post' });
    }
  };






module.exports= {makePosts,getPostById}