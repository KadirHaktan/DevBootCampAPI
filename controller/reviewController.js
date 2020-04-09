const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')
const Review = require('../model/Review')
const Bootcamp=require('../model/BootCamp')


exports.GetReviews = asyncHandler(async (req, res, next) => {

    const {
        bootcampId
    } = req.params

    if (bootcampId) {
        const reviews = await Review.find({
            bootcamp: bootcampId
        })

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        })
    } else {
        res.status(200).json(res.advancedResult)
    }

})

exports.GetReview = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params

    const review = await Review.findById(id).populate('bootcamp')

    if (!review) {
        return next(new ErrorResponse('Review not found'), 404)
    }

    res.status(200).json({
        success: true,
        data: review
    })
})



exports.AddReview = asyncHandler(async (req, res, next) => {

    req.body.bootcamp = req.params.bootcampId
    req.body.user=req.user.id

    const bootcamp=await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with ${req.params.bootcampId}`, 404))
    }
    
    const review=await Review.create(req.body)

    res.status(200).json({
        success:true,
        data:review
    })


})

exports.UpdateReview = asyncHandler(async (req, res, next) => {
    let review=await Review.findById(req.params.id)

    if (!review) {
        return next(new ErrorResponse(`No bootcamp with ${req.params.bootcampId}`, 404))
    }

    if(review.user.id!=req.user.id && req.user.role!="admin"){
        return next(new ErrorResponse(`That user ${req.user.id} can not update this review
        .Because this review is not belong to that user `),401)
    }
    
    review=await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success:true,
        data:review
    })


})


exports.DeleteReview=asyncHandler(async(req,res,next)=>{
    const review=await Review.findById(req.params.id)

    if (!review) {
        return next(new ErrorResponse(`No bootcamp with ${req.params.bootcampId}`, 404))
    }

    if(review.user.id!=req.user.id && req.user.role!="admin"){
        return next(new ErrorResponse(`That user ${req.user.id} can not update this review
        .Because this review is not belong to that user `),401)
    }
    
    await Review.remove()

    res.status(200).json({
        success:true,
        data:{}
    })
})
