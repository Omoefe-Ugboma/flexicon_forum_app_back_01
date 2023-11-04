const Comm = require('../models/Community')
//const User = require('../models/User')

// Define a function to get all communities
const getComms = async(req, res)=>{
    try{
        
        // const {username} = req.body
        // const user = await User.findOne({username})
        // const {_id:userId} = user
        // const comm = await Comm.find({creator:userId})
    
        const comm = await Comm.find()
        res.status(200).json(comm)

    }catch(error){
        res.status(500).json({msg: error.message})
    }   

}

// Define a function to get a community
const getAComm = async(req, res)=>{
    try{
        const{id:commId} = req.params
        const comm = await Comm.findById({_id: commId})
        
        // const {name} = req.body
        // if(!name){
        //     return res.status(400).json({msg: "Please provide the name of the community"})
        // }
        // const comm = await Comm.findOne({name})
        if(!comm){
            return res.status(401).json({msg: "This community does not exist"})
        }

        res.status(200).json(comm)

    }catch(error){
        res.status(500).json({msg: error.message})
    }    
    
}

// Define a function to create a community
const createComm = async(req, res)=>{
    try{
        const {name} = req.body
        if(!name){
            return res.status(400).json({msg: "Please provide a name for the community"})
        }

        req.body.creator = req.user.userId
        const comm = await Comm.create(req.body)
        res.status(201).json(comm)

    }catch(error){
        res.status(500).json({msg: error.message})
    }     
    
}

// Define a function to update a community
const updateComm = async(req, res)=>{
    try{

        const {params:{id:commId},user:{userId},body:{name}} = req
        
        const comm = await Comm.findByIdAndUpdate({_id:commId,userId}, {name}, {new:true, runValidators:true})
        if(!comm){
            return res.status(401).json({msg: "This community does not exist"})
        }
        res.status(200).json({msg:'Update successful'})

    }catch(error){
        res.status(500).json({msg: error.message})
    } 

}

// Define a function to delete a community
const deleteComm = async(req, res)=>{
    try{

        const {params:{id:commId},user:{userId}} = req        

        const comm = await Comm.findByIdAndDelete({_id:commId,creator:userId})
        if(!comm){
            return res.status(401).json({msg: "This community does not exist"})
        }
        res.status(200).json({msg: "Community successfully deleted"})

    }catch(error){
        res.status(500).json({msg: error.message})
    }    
    
}

module.exports = {
    getComms,
    createComm,
    getAComm,
    updateComm,
    deleteComm
    }