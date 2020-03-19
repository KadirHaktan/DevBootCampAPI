const express=require('express')
const router=express.Router()
const {Login,GetMe}=require('../controller/authController')
const {protect}=require('../middleware/auth')

router.route("/login").post(Login)
router.route("/getme").get(protect,GetMe)

module.exports=router