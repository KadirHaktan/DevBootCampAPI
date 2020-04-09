const express=require('express')
const router=express.Router({mergeParams:true})
const Review=require('../model/Review')
const advancedResult=require('../middleware/advancedResult')
const {GetReviews,GetReview,AddReview}=require('../controller/reviewController')
const {protect,authorize}=require('../middleware/auth')


router.route("/")
.get(advancedResult(Review,'Show all review','user','bootcamp'),GetReviews)
.post(protect,authorize('user','admin'),AddReview)

router.route("/:id")
.get(GetReview)


module.exports=router


