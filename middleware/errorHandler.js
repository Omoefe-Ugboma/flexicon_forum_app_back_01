
//middleware to handle errors
const errorHandler = (err,req,res,next)=>{
    res.status(500).json({msg:'Something went wrong'})
}

module.exports = errorHandler