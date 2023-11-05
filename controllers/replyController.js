const Reply = require('../models/Reply')
const Post = require('../models/Post')
const User = require('../models/User')

const Thread = require('../models/Thread')

const createReply = async (req, res) => {
   const user = req.user.userId;
   const author = await User.findById({_id:user})
   const {content,postId,threadId} =req.body
   const [ post, thread] = await Promise.all([
    Post.findById({_id:postId}),
    Thread.findById({_id: threadId})]

   )
  
   try {
        const reply = new Reply({
            author,
            content,
            post,
            thread 
         })
          // console.log(reply)
      
      const Savedreply = await reply.save();
       post.replies.push(reply._id)
       console.log(reply)
       const savedPost = await post.save()
       console.log(savedPost)
        res.json(Savedreply)
       

          } catch (error) {
            res.status(500).json({ message:error.message})
          }
        
    }

    const findReplyById = async (req, res) => {
      const replyId =req.params.replyId
      console.log(replyId)
      try {
     const reply = await Reply.findById(replyId)
        if (reply) {
          res.json(reply)
        } else {
          res.status(404).json({ message: 'Reply not found' })
        }
      } catch (error) {
        res.status(500).json({ message: 'Error fetching reply' })
      }
    };
    const updateReply = async (req, res) => {
      const replyId = req.params.replyId
      const {content,threadId,postId}=req.body
      try {
        const reply = await Reply.findById(replyId)
        if (!reply) {
          return res.status(404).json({ message: 'Reply not found' })
        }
        reply.content = content ? content: reply.content
        reply.thread = threadId ? threadId: reply.thread
        reply.post = postId? postId: reply.post
        
        
        const updateReply = await Reply.save()
        res.status(202).json(updateReply)
      } catch (error) {
        res.status(500).json({ message: 'Error updating reply' })
      }
    }

     const deleteReplyById = async (req, res) => {
      const replyId = req.params.replyId

      try {
        // Find and delete the reply by its ID
        const reply = await Reply.findByIdAndDelete(replyId)
    
        if (!reply) {
          // If the reply does not exist, send a 404 status code and a message
          return res.status(404).json({ message: 'Reply not found' })
        }
    
        // Send a success message as a JSON response
        res.json({ message: 'Reply deleted successfully' })
      } catch (error) {
        // Handle any errors by sending a 500 status code and an error message
        res.status(500).json({ message: 'Error deleting Reply' })
      }
    };
  module.exports = {createReply,findReplyById,deleteReplyById}




  //    const savedReply=await reply.save()
        //    res.json(savedReply)
        //   post.replies.push(savedReply)
        //   console.log(savedReply)
        //   const savedPost = await post.save()
        //    res.json(reply)