// Adding necessary imports
const Reply = require('../models/Reply');
const Post = require('../models/Post');
const User = require('../models/User');
const Thread = require('../models/Thread');

// Function for creating replies
const createReply = async (req, res) => {
  // Extract the user ID from the request
  const author = req.user.userId;
  
  // Find the author based on the user ID
  // const author = await User.findById({_id: user});
  
  // Extract content, postId, and threadId from the request body
  const { content, postId, threadId } = req.body;

  // Find the associated post and thread using their IDs
  const [ post, thread ] = await Promise.all([
    Post.findById({_id: postId}),
    Thread.findById({_id: threadId})
  ]);

  try {
    // Create a new reply
    const reply = new Reply({
      author,
      content,
      post: postId,
      thread: threadId 
    });

    // Save the reply to the database
    const savedReply = await reply.save();

    // Update the associated post with the new reply's ID
    post.replies.push(savedReply._id);
    await post.save();

    // Update the associated thread with the new reply's ID
    thread.replies.push(savedReply._id)
    await thread.save()

    // Send the saved reply as a JSON response
    res.json(savedReply);

  } catch (error) {
    // Handle any errors by sending a 500 status code and an error message
    res.status(500).json({ message: error.message });
  }
};

const findReplyById = async (req, res) => {
  // Extract the reply ID from the request parameters
  const replyId = req.params.replyId;

  try {
    // Find the reply by its ID
    const reply = await Reply.findById(replyId);

    // Check if the reply exists
    if (reply) {
      res.json(reply); // Send the reply as a JSON response
    } else {
      res.status(404).json({ message: 'Reply not found' }); // Send a 404 status if reply is not found
    }

  } catch (error) {
    res.status(500).json({ message: 'Error fetching reply' }); // Handle any errors
  }
};

const updateReplyById = async (req, res) => {
  // Extract the reply ID and content from the request
  const replyId = req.params.replyId;
  const { content } = req.body;

  try {
    // Find the reply by its ID
    const reply = await Reply.findById(replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' }); // Send a 404 status if reply is not found
    }

    // Update the content if provided in the request body
    reply.content = content ? content : reply.content;

    // Save the updated reply
    const updatedReply = await reply.save();

    res.status(202).json(updatedReply); // Send the updated reply as a JSON response

  } catch (error) {
    res.status(500).json({ message: 'Error updating reply' }); // Handle any errors
  }
};

const deleteReplyById = async (req, res) => {
  const replyId = req.params.replyId;

  try {
    // Find and delete the reply by its ID
    const reply = await Reply.findByIdAndDelete(replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' }); // Send a 404 status if reply is not found
    }

    res.json({ message: 'Reply deleted successfully' }); // Send a success message as a JSON response

  } catch (error) {
    res.status(500).json({ message: 'Error deleting reply' }); // Handle any errors
  }
};

// Function to handle votes
const updateReplyVote = async (req, res) => {
  // Retrieve user and reply ids
  const voter = req.user.userId
  const replyId = req.params.id
  routePath = req.path.split('/')[2]
  console.log(routePath)

  // Voting
  try {
    // Find the reply by its ID
    const reply = await Reply.findById(replyId)
    const author = await User.findById(reply.author)
    const initialVote = reply.votes
    if (routePath == 'upvote') {
      if(reply.upvotes.includes(voter)){
        reply.votes -= 1
        reply.upvotes = reply.upvotes.filter(user => !reply.upvotes.includes(voter))  
      } else if(reply.downvotes.includes(voter)){
        reply.votes += 2
        reply.downvotes = reply.downvotes.filter(user => !reply.downvotes.includes(voter))  
        reply.upvotes.push(voter)  
      } else {
        reply.votes += 1
        reply.upvotes.push(voter)
      }
    } else if(routePath == 'downvote'){
      if(reply.downvotes.includes(voter)){
        reply.votes += 1
        reply.downvotes = reply.downvotes.filter(user => !reply.downvotes.includes(voter))
      } else if(reply.upvotes.includes(voter)){
        reply.votes -= 2
        reply.upvotes = reply.upvotes.filter(user => !reply.upvotes.includes(voter))  
        reply.downvotes.push(voter) 
      } else {
        reply.votes -= 1
        reply.downvotes.push(voter)
      }
    }
    console.log(reply.votes)
    author.activity.reputation += reply.votes - initialVote
    await author.save()
    await reply.save()
    res.status(200).json(reply)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = { createReply, findReplyById, deleteReplyById, updateReplyById, updateReplyVote };
