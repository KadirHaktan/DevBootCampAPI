
const express=require('express')
const route=express.Router({mergeParams:true})
const {GetCourses,GetCourseById,AddCourse,UpdateCourse,DeleteCourse}=require('../controller/courseController')

const Course=require('../model/Course')
const advancedResult=require('../middleware/advancedResult')
const {protect}=require('../middleware/auth')

route.route('/').get(protect,advancedResult(Course,'bootcamp','Success Show to course or courses'),GetCourses)
route.route('/:id').get(protect,GetCourseById)
route.route('/').post(protect,AddCourse)
route.put('/:id').post(protect,UpdateCourse)
route.delete('/:id').post(protect,DeleteCourse)

module.exports=route