const asyncHandler = require('../middleware/async')
const ErrorResponse=require('../utils/ErrorResponse')
const Review = require('../model/Review')


exports.GetReviews=asyncHandler(async(req,res,next)=>{
    res.status(200).json(res.advancedResult)
})

exports.GetReview=asyncHandler(async(req,res,next)=>{
    const review=await Review.findById(req.params.id).populate('bootcamp user')

    res.status(200).json({
        success:true,
        data:review
    })
})
