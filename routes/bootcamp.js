
const express=require('express')
const route=express.Router()
const controller=require('../controller/bootcampController')
const courseRouter=require('./course')
const advancedResult=require('../middleware/advancedResult')
const Bootcamp=require('../model/BootCamp')
const {protect}=require('../middleware/auth')

route.route('/').get(protect,advancedResult(Bootcamp,'courses','Success Get Bootcamp or Bootcamps'),controller.GetBootCamps)
route.route('/:id').get(protect,controller.GetBootCampById)

route.use('/:bootcampId/courses',courseRouter)

route.route('/radius/:zipcode/:distance').get(protect,controller.GetBootCampByRadius)


route.route('/add').post(protect,controller.AddBootCamp)

route.route('/update/:id').put(protect,controller.UpdateBootCamp)
route.route('/photo/:id').put(protect,controller.UploadBootcampPhoto)

route.route('/delete/:id').delete(protect,controller.DeleteBootCamp)





module.exports=route