const express = require('express')
const router = express.Router();

//exposing signup endpoint
router.post('/v1/signup',(req,res)=>{
    const{username,password}= req.body;
    try {
    return res.status(201).json({message:'user created successfully'});
    

} catch (error) {
    console.error(error).json({error:'internal server errors'})
}
});

router.post('/v1/login',(req,res)=>{
    const {username,password}=req.body;

    try {
        return res.status(200).json({message:'user login successful'})
    } catch (error) {
        console.error(error).json({error:'internal server error'})
        
    }
})


module.exports=router;