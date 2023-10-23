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
   }
});

// Create the reply model
const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;