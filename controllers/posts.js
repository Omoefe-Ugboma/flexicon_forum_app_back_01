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





//Function to Update posts 
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content, category, tags, threadId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.content = content;
    post.category = category;
    post.tags = tags;
    post.Thread = threadId;

    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
};





//Function to Delete posts 
const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the post
    await post.remove();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};




module.exports = { makePosts, getPostById, updatePost, deletePost };


