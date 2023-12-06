// POST MODEL
const mongoose = require('mongoose')

// Define the post schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'Machine Learning',
        'Artificial Intelligence',
        'Cloud Computing',
        'Cybersecurity',
        'Blockchain',
        'Internet of Things',
        'Other',
      ],
      required: true,
    },
    tags: [String],

    votes: {
      type: Number,
      default: 0,
    },

    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
      required: true,
    },

    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  },
  { timestamps: true }
)
//create index for querying the model
postSchema.index({title:"text", content: "text",category: "text"});
// Create the post model
const Post = mongoose.model('Post', postSchema)

module.exports = Post
