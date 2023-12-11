const Comm = require('../models/Community')
//const User = require('../models/User')

// Define a function to get all communities
const getComms = async (req, res) => {
  try {
    // const {username} = req.body
    // const user = await User.findOne({username})
    // const {_id:userId} = user
    // const comm = await Comm.find({creator:userId})

    const comm = await Comm.find()
    res.status(200).json(comm)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// Define a function to get a community
const getAComm = async (req, res) => {
  try {
    const { id: commId } = req.params
    const comm = await Comm.findById({ _id: commId })

    if (!comm) {
      return res.status(401).json({ msg: 'This community does not exist' })
    }

    res.status(200).json(comm)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// Define a function to create a community
const createComm = async (req, res) => {
  try {
    const { name } = req.body
    const { userId } = req.user

    if (!name) {
      return res
        .status(400)
        .json({ msg: 'Please provide a name for the community' })
    }

    req.body.members = userId
    req.body.creator = userId
    req.body.moderators = userId

    let comm = await Comm.findOne({name})

    if(comm){
      return res.status(400).json({msg: 'This community already exists'})
    }

    comm = await Comm.create(req.body)    
    res.status(201).json(comm)

  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// Define a function to update a community
const updateComm = async (req, res) => {
  try {
    const {
      params: { id: commId },
      user: { userId },
      body: { name },
      query: { member, moderator, id: moderatorId }
    } = req    

    if(name && !member && !moderator){
      let comm = await Comm.findOne({name})

      if(comm){
        return res.status(400).json({msg:'This community already exists'})
      }
      comm = await Comm.findOneAndUpdate(
        { _id: commId, creator: userId },
        { name },
        { new: true, runValidators: true }
      )

      if (!comm) {
        return res.status(401)
                  .json({ msg: 'Either this community does not exist or you are not its creator' })
      }

      return res.status(200).json({ msg: 'Community name updated successful' })

    }else if(member && !name && !moderator){
      if (member == 'join'){
        let comm = await Comm.findOne(
          { _id: commId, members: userId }
          )
        
        if(comm){
          return res.status(400).json({msg:'User is already a member of this community'})
        }else{

          comm = await Comm.findByIdAndUpdate(
            { _id: commId },
            { $push: { members: userId } },
            { new: true, runValidators: true }
          )
          if(comm){
            return res.status(200).json({ msg: 'You have successfully joined this Community' })
          }else{
            return res.status(200).json({ msg: 'This community does not exist' })
          }          
          
        }
      }else if(member == 'leave'){
        let comm = await Comm.findOne(
          { _id: commId, members: userId }
          )
        
        if(comm){
          
          comm = await Comm.findByIdAndUpdate(
          { _id: commId },
          { $pull: { members: userId } },
          { new: true, runValidators: true }          
        )

        return res.status(200).json({ msg: 'You have successfully left this Community' })
        
        }else{
          return res.status(401)
          .json({ msg: 'Either this community does not exist or this User is not a member of this community' })     
        }
      }else{
        return res.status(400).json({msg:"Bad Request"})
      }
    }else if(moderator && !name && !member){
      if (moderator == 'add'){
        let comm = await Comm.findOne(
          { _id: commId, members: userId }
          )
        
        if(comm){
          comm = await Comm.findByIdAndUpdate(
            { _id: commId },
            { $push: { moderators: moderatorId } },
            { new: true, runValidators: true }
          )
          if(comm){
            return res.status(200).json({ msg: 'User successfully added as a moderator' })
          }else{
            return res.status(200).json({ msg: 'Something went wrong. The user could not be made a moderator' })
          }
          
        }else{
          return res.status(400).json({ msg: 'Either this community does not exist or you are not authorised to make \
          a user a moderator in this community' })              
        }
        
      }else if(moderator == 'remove'){
        let comm = await Comm.findOne(
          { _id: commId, creator: userId }
          )
        
        if(comm){
          
          comm = await Comm.findByIdAndUpdate(
          { _id: commId },
          { $pull: { moderators: moderatorId } },
          { new: true, runValidators: true }          
          )

          if(comm){
            return res.status(200).json({ msg: 'Success!!! The user is no longer a moderator' })
          }else{
            return res.status(200).json({ msg: 'Something went wrong. The user could not be removed as a moderator' })
          }
        }else{
          return res.status(400).json({ msg: 'Either this community does not exist or you are not authorised to remove \
        a moderator in this community' })
          
        }
        
      }else{
        return res.status(400).json({msg:"Bad Request"})        
      }

    }else{
      return res.status(400).json({msg:"Bad Request"})
    }  
    
  }catch(error){
    res.status(500).json({ msg: error.message })
  }
}

// Define a function to delete a community
const deleteComm = async (req, res) => {
  try {
    const {
      params: { id: commId },
      user: { userId },
    } = req

    const comm = await Comm.findByIdAndDelete({ _id: commId, creator: userId })
    if (!comm) {
      return res.status(401).json({ msg: 'This community does not exist' })
    }
    res.status(200).json({ msg: 'Community successfully deleted' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  getComms,
  createComm,
  getAComm,
  updateComm,
  deleteComm,
}
