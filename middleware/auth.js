const asyncHandler=require('./async')
const jwt=require('jsonwebtoken')
const ErrorResponse=require('../utils/ErrorResponse')
const User=require('../model/User')


exports.protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next(new ErrorResponse('Not authorized to access',401))
    }

    try{    
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decoded)
        req.user=await User.findById(decoded.id)
        next()
    }catch(err){
        return next(new ErrorResponse(`Not authorized to access=>${err}`,401))
    }
})