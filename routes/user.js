
const express=require('express')
const router=express.Router()
const {Register,GetUsers,GetUser,UpdateUser,CreateUser,DeleteUser}=require('../controller/userController')
const advancedResults=require('../middleware/advancedResult')
const {protect,authorize}=require('../middleware/auth')
const User=require('../model/User')

router.route("/register").post(Register)

router.use(protect)
router.use(authorize("admin"))

router.route("/")
.get(advancedResults(User,'Show all users'),GetUsers)
.post(CreateUser)


router.route("/:id")
.get(GetUser)
.put(UpdateUser)
.delete(DeleteUser)

module.exports=router

