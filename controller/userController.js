

const User=require('../model/User')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')


exports.Register=asyncHandler(async(req,res,next)=>{
    const {name,email,password,role}=req.body

    const user=await User.create({name,email,password,role})

    res.status(200).json({
        success:true,
        data:user
    })

})

exports.GetUsers=asyncHandler(async(req,res,next)=>{
    res.status(200).json(res.advancedResult)
})

exports.GetUser=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.params.id)

    res.status(200).json({
        success:true,
        data:user
    })
})


exports.CreateUser=asyncHandler(async(req,res,next)=>{
    const user=await User.create(req.body)
    res.status(200).json({
        success:true,
        data:user
    })
})

exports.UpdateUser=asyncHandler(async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        data:user
    })
})

exports.DeleteUser=asyncHandler(async(req,res,next)=>{
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        data:{}
    })
})


