// Import the required models
const Post = require('../models/Post')
const Thread = require('../models/Thread')

// Function for making posts
const makePosts = async (req, res) => {
  // Get the user ID from the request object
  const author = req.user.userId
  // Destructure the post data from the request body
  const { title, content, category, tags, threadId } = req.body
  // Find the author and the thread using their IDs
  const thread = await Thread.findById({ _id: threadId })

  // Create a new post instance with the post data
  const newPost = new Post({
    author,
    title,
    content,
    tags,
    category,
    thread: threadId,
  })
  try {
    // Save the new post to the database
    const savedPost = await newPost.save()
    // Add the new post to the thread's posts array
    thread.posts.push(newPost._id)
    // Save the updated thread to the database
    await thread.save()
    // Send the saved post as a JSON response
    res.status(201).json(savedPost)
  } catch (error) {
    // Handle any errors by sending a 500 status code and an error message
    res.status(500).json({ message: error.message })
  }
}

// Function to get a post by its ID
const getPostById = async (req, res) => {
  // Get the post ID from the request parameters
  const postId = req.params.id
  try {
    // Find the post by its ID
    const post = await Post.findById(postId)
    if (post) {
      // If the post exists, send it as a JSON response
      res.status(200).json(post)
    } else {
      // If the post does not exist, send a 404 status code and a message
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    // Handle any errors by sending a 500 status code and an error message
    res.status(500).json({ message: 'Error fetching post' })
  }
}

// Function to update a post
const updatePost = async (req, res) => {
  // Get the post ID from the request parameters
  const postId = req.params.id
  // Destructure the updated post data from the request body
  const { title, content, category, tags } = req.body

  try {
    // Find the post by its ID
    const post = await Post.findById(postId)

    if (!post) {
      // If the post does not exist, send a 404 status code and a message
      return res.status(404).json({ message: 'Post not found' })
    }

    // Update the post fields with the new data or keep the old data
    post.title = title ? title : post.title
    post.content = content ? content : post.content
    post.category = category ? category : post.category
    post.tags = tags ? tags : post.tags

    // Save the updated post to the database
    const updatedPost = await post.save()

    // Send the updated post as a JSON response
    res.status(202).json(updatedPost)
  } catch (error) {
    // Handle any errors by sending a 500 status code and an error message
    res.status(500).json({ message: 'Error updating post' })
  }
}

// Function to delete a post
const deletePost = async (req, res) => {
  // Get the post ID from the request parameters
  const postId = req.params.id

  try {
    // Find and delete the post by its ID
    const post = await Post.findByIdAndDelete(postId)

    if (!post) {
      // If the post does not exist, send a 404 status code and a message
      return res.status(404).json({ message: 'Post not found' })
    }

    // Send a success message as a JSON response
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    // Handle any errors by sending a 500 status code and an error message
    res.status(500).json({ message: 'Error deleting post' })
  }
}

// Function to handle votes
const updateVote = async (req, res) => {
  // Retrieve user and post ids
  const voter = req.user.userId
  const postId = req.params.id
  routePath = req.path.split('/')[2]
  console.log(routePath)

  // Upvoting
  try {
    // Find the post by its ID
    const post = await Post.findById(postId)
    if (routePath == 'upvote') {
      if(post.upvotes.includes(voter)){
        post.votes -= 1
        post.upvotes = post.upvotes.filter(user => !user.upvotes.includes(voter))  
      } else if(post.downvotes.includes(voter)){
        post.votes += 2
        post.downvotes = post.downvotes.filter(user => !user.downvotes.includes(voter))  
        post.upvotes.push(voter)  
      } else {
        post.votes += 1
        post.upvotes.push(voter)
      }
    } else if(routePath == 'downvote'){
      if(post.downvotes.includes(voter)){
        post.votes += 1
        post.downvotes = post.downvotes.filter(user => !user.downvotes.includes(voter))
      } else if(post.upvotes.includes(voter)){
        post.votes -= 2
        post.upvotes = post.upvotes.filter(user => !user.upvotes.includes(voter))  
        post.downvotes.push(voter) 
      } else {
        post.votes -= 1
        post.downvotes.push(voter)
      }
    }
    console.log(post.votes)
    await post.save()
    res.status(200).json(post)
  } catch (error) {
    console.log(error.message)
  }

  // Downvoting
}

// Export the functions as a module
module.exports = { makePosts, getPostById, updatePost, deletePost, updateVote }
