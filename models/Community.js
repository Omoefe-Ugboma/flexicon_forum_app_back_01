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

    posts: [{ type : mongoose.Schema.Types.ObjectId, ref : 'Post' }],
    members: [{ type : mongoose.Schema.Types.ObjectId, ref : 'User', required: true }],
    moderators: [{ type : mongoose.Schema.Types.ObjectId, ref : 'User', required: true }]

    
},
{ timestamps : true}
);
//create index for querying the model
commSchema.index({name:"text"})
// Create the community model
const Community = mongoose.model('Community', commSchema);

module.exports = Community;
