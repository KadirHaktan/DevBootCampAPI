const express=require('express')
const router=express.Router()
const Review=require('../model/Review')
const advancedResult=require('../middleware/advancedResult')
const {GetReviews,GetReview}=require('../controller/reviewController')


router.route("/")
.get(advancedResult(Review,'Show all review','user','bootcamp'),GetReviews)


router.route('/:id')
.get(GetReview)

module.exports=router


