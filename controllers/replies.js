const Reply = require('../models/Reply')
const Post = require('../models/Post')
const Thread = require('../models/Thread')
const { threadId } = require('worker_threads')
const { Console } = require('console')


const createReply = async (req, res) => {
    
    const {content, post,thread} =req.body
//    const thread = await Thread.findById({_id: threadId})
   
   
    try {
        const reply = new Reply({
            content,
            post:post,
            Thread:thread
         })
         console.log(reply)
      
       Savedreply =  await reply.save();
        res.json(Savedreply)

          } catch (error) {
            res.status(500).json({ message: 'error making the reply' })
          }
        
    }
  


module.exports = {createReply}




  //    const savedReply=await reply.save()
        //    res.json(savedReply)
        //   post.replies.push(savedReply)
        //   console.log(savedReply)
        //   const savedPost = await post.save()
        //    res.json(reply)