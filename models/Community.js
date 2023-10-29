//COMMUNITY MODEL
const mongoose = require('mongoose');

//DEFINE COMMUNITY SCHEMA
const comSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    date: {
        
        type: Date,
        default: Date.now
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    post: [{ type : mongoose.Schema.Types.ObjectId, ref : 'Post' }]
    
})

// Create the community model
const Com = mongoose.model('Com', comSchema);

module.exports = Com;
