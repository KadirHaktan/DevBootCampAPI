const express = require('express')
const route = express.Router()
const controller = require('../controller/bootcampController')
const courseRouter=require('./course')
const reviewRouter=require('./review')
const advancedResult = require('../middleware/advancedResult')
const Bootcamp = require('../model/BootCamp')
const {
    protect,
    authorize
} = require('../middleware/auth')

route.route('/').get(protect, advancedResult(Bootcamp, 'Success Get Bootcamp or Bootcamps','courses','user'), controller.GetBootCamps)
route.route('/:id').get(protect, controller.GetBootCampById)

route.use('/:bootcampId/courses', courseRouter)
route.use("/:bootcampId/reviews",reviewRouter)

route.route('/radius/:zipcode/:distance').get(protect, controller.GetBootCampByRadius)


route.route('/add').post(protect,authorize("publisher","admin"),controller.AddBootCamp)

route.route('/update/:id').put(protect,authorize("publisher","admin"),controller.UpdateBootCamp)
route.route('/photo/:id').put(authorize("publisher", "admin"), protect,
    controller.UploadBootcampPhoto)

route.route('/delete/:id').delete(protect,authorize("publisher","admin"),controller.DeleteBootCamp)





module.exports = route