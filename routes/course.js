
const express=require('express')
const route=express.Router({mergeParams:true})
const {GetCourses,GetCourseById,AddCourse,UpdateCourse,DeleteCourse}=require('../controller/courseController')

const Course=require('../model/Course')
const advancedResult=require('../middleware/advancedResult')
const {protect,authorize}=require('../middleware/auth')

route.route('/').get(protect,advancedResult(Course,'Success Show to course or courses','bootcamp','user'),GetCourses)
route.route('/:id').get(protect,authorize("publisher","admin"),GetCourseById)
route.route('/').post(protect,authorize("publisher","admin"),AddCourse)
route.put('/:id').post(protect,authorize("publisher","admin"),UpdateCourse)
route.delete('/:id').post(protect,authorize("publisher","admin"),DeleteCourse)

module.exports=route