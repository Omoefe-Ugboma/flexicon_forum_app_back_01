const Comm = require('../models/Community')
const User = require('../models/User')

// Define a function to get communities based on a username
const getComms = async(req, res)=>{
    const {username} = req.body
    const user = await User.findOne({username})
    const {_id:userId} = user
    const comm = await Comm.find({creator:userId})
    
    //const {name} = req.body
    //const comm = await Comm.find({name})
    res.status(201).json({comm})  

}

// Define a function to get a community
const getAComm = async(req, res)=>{
    // const{user:{userId}, params:{id:commId}} = req

    // const comm = await Comm.findOne({_id: commId,creator:userId})
    
    const {name} = req.body
    const comm = await Comm.findOne({name})
    if(!comm){
        return res.status().json('This community does not exist')
    }

    return res.status(200).json({comm})
    
}

// Define a function to create a community
const createComm = async(req, res)=>{
    req.body.creator = req.user.userId
    const comm = await Comm.create(req.body)
    res.status(201).json({msg:'Community successfully created'})
    
}

// Define a function to update a community
const updateComm = async(req, res)=>{
    const {body:{name},user:{userId}} = req
    const comm = await Comm.findOneAndUpdate({name,userId}, {name}, {new:true, runValidators:true})
    if(!comm){
        return res.status().json('This community does not exist')
    }
    return res.status(201).json({msg:'Update successfully'})

    
}

// Define a function to delete a community
const deleteComm = async(req, res)=>{
    const {body:{name},user:{userId}} = req
    const comm = await Comm.findOneAndDelete({name,userId})
    if(!comm){
        return res.status().json('This community does not exist')
    }
    return res.status(201).json({msg:`${name} successfully deleted`})
    
}


module.exports = {
    getComms,
    createComm,
    getAComm,
    updateComm,
    deleteComm
    }