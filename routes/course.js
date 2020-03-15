
const express=require('express')
const route=express.Router({mergeParams:true})
const {GetCourses,GetCourseById,AddCourse,UpdateCourse,DeleteCourse}=require('../controller/courseController')


route.get('/',GetCourses)
route.get('/:id',GetCourseById)
route.post('/',AddCourse)
route.put('/:id',UpdateCourse)
route.delete('/:id',DeleteCourse)

module.exports=route