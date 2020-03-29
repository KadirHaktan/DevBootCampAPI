const express=require('express')
const router=express.Router()
const {Login,GetMe,forgotPassword,ResetPassword}=require('../controller/authController')
const {protect}=require('../middleware/auth')

router.route("/login").post(Login)
router.route("/getme").get(protect,GetMe)
router.route("/forgotpassword").post(forgotPassword)
router.route("/resetPassword/:resettoken").put(ResetPassword)

module.exports=router