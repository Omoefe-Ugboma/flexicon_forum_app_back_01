//COMMUNITY MODEL
const mongoose = require('mongoose');

//DEFINE COMMUNITY SCHEMA
const commSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },
    
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    post: [{ type : mongoose.Schema.Types.ObjectId, ref : 'Post' }]
    
},
{ timestamps : true}
);

// Create the community model
const Community = mongoose.model('Community', commSchema);

module.exports = Community;
