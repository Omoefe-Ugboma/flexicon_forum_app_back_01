// THREAD MODEL
const mongoose = require('mongoose');

// Define Thread schema
const threadSchema = new mongoose.Schema({
    Creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],


    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
},
{ timestamps : true}
);

//create thread model
const Thread = mongoose.model('Thread',threadSchema);
module.exports = Thread;