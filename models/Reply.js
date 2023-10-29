// REPLY MODEL
const mongoose = require('mongoose');

// Define the reply schema
const replySchema = new mongoose.Schema({
  content : {
      type : String,
      required : true
   },
   author : { 
      type : mongoose.Schema.Types.ObjectId, 
      ref : 'User',
      required : true 
   },
   createdAt : { 
      type : Date, 
      default : Date.now 
   },
   updatedAt : { 
      type : Date, 
      default : Date.now 
   },
   votes : { 
      type : Number, 
      default :0 
   },

   Thread :{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
      required: true
    },

   post : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
   }
});

// Create the reply model
const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;