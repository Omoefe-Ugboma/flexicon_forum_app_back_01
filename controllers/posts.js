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

module.exports = { makePosts, getPostById }
