const mongoose = require('mongoose')
const User = require('../models/User')

const signup = async(req,res)=>{
    try{
        const {email,password} = req.body

        console.log(req.body)

        //check if email and password were inputted
        if(!email || !password){
        return res.json({msg:'Please provide your user credentials'})
        }

        //validate email
        const checkEmail = await User.findOne({email})
        if(checkEmail){
            return res.json({msg:'Email already exists'})
        }

        const user = await User.create(req.body)
        const token = user.createJWT()

        return res.status(201).json({token})

    }catch(error){
        //next(error)
        res.status(500).json({msg: error.message})
    }

}

const login = async(req,res)=>{
    try{
        const {email, password} = req.body
        console.log(req.body)
        
        if(!email || !password){
            return res.json({msg:'Please provide your user credentials'})
        }

        const user = await User.findOne({email})

        if(!user){
            return res.json({ msg:'Invalid credentials' })
        }

        const passwordMatch = await user.comparePassword(password)
        if(!passwordMatch){
            return res.json({ msg:'Invalid credentials' })
        }

        const token = user.createJWT()
        return res.status(200).json({token})

    }catch(error){
        res.status(500).json({msg: error.message})
    }

}

module.exports = {signup, login}