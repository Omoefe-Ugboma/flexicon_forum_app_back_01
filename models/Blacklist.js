const mongoose = require('mongoose')


const blackListSchema = new mongoose.Schema(
  {
       token:{
        type: String,
        required: true,
        unique: true,
        expiresat:{ type: Date, default: Date.now, expires: 24 * 60 * 60 },
        
        
       },
      
    },
   
)
blackListSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const BlackList = mongoose.model('BlackList',blackListSchema)
module.exports = BlackList