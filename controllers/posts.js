const Post = require('../models/Post')
const Thread = require('../models/Thread')
const User = require('../models/User')

//function for making posts
const makePosts = async (req, res) => {
  try {
    const userId = req.user.userId
    console.log(userId, req.body)
    const { title, content, category, tags, threadId } = req.body
    const [author, thread] = await Promise.all([
      User.findById({ _id: userId }),
      Thread.findById({ _id: threadId }),
    ])
    console.log(author, thread)
    const newPost = new Post({
      author,
      title,
      content,
      tags,
      category,
      Thread: thread,
    })
    const savedPost = await newPost.save()
    thread.posts.push(newPost)
    const savedThread = await thread.save()
    console.log(savedPost, savedThread)
    res.json(savedPost)
  } catch (error) {
    res.status(500).json({ message: 'error making the post' })
  }
}

const getPostById = async (req, res) => {
  const postId = req.params.id
  try {
    const post = await Post.findById(postId)
    if (post) {
      res.json(post)
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' })
  }
}

//Function to Update posts
const updatePost = async (req, res) => {
  const postId = req.params.id
  const { title, content, category, tags, threadId } = req.body

  try {
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    post.title = title
    post.content = content
    post.category = category
    post.tags = tags
    post.Thread = threadId

    const updatedPost = await post.save()

    res.json(updatedPost)
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' })
  }
}

//Function to Delete posts
const deletePost = async (req, res) => {
  const postId = req.params.id

  try {
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Delete the post
    await post.remove()

    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' })
  }
}

module.exports = { makePosts, getPostById, updatePost, deletePost }
