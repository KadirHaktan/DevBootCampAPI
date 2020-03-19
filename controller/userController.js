

const User=require('../model/User')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')


exports.Register=asyncHandler(async(req,res,next)=>{
    const {name,email,password,role}=req.body

    const user=await User.create({
        name,
        email,
        password,
        role
    })

    res.status(200).json({
        success:true,
        data:user
    })

})