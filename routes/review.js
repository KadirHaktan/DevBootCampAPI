const express=require('express')
const router=express.Router({mergeParams:true})
const Review=require('../model/Review')
const advancedResult=require('../middleware/advancedResult')
const {GetReviews}=require('../controller/reviewController')


router.route("/")
.get(advancedResult(Review,'Show all review','user','bootcamp'),GetReviews)


module.exports=router


