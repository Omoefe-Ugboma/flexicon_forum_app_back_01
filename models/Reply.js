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
},
{ timestamps : true}
);

// Create the reply model
const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;