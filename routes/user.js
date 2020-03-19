
const express=require('express')
const router=express.Router()
const {Register}=require('../controller/userController')

router.route("/register").post(Register)

module.exports=router

