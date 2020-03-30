const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')
const Review = require('../model/Review')


exports.GetReviews = asyncHandler(async (req, res, next) => {

    const {bootcampId}=req.params

    if (bootcampId) {
        const reviews = await Review.find({
            bootcamp:bootcampId
        })

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        })
    }

    else{
        res.status(200).json(res.advancedResult)
    }
    
})

