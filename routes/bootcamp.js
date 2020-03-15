
const express=require('express')
const route=express.Router()
const controller=require('../controller/bootcampController')

const courseRouter=require('./course')


route.get('/',controller.GetBootCamps)
route.get('/:id',controller.GetBootCampById)

route.use('/:bootcampId/courses',courseRouter)

route.get('/radius/:zipcode/:distance',controller.GetBootCampByRadius)


route.post('/add',controller.AddBootCamp)

route.put('/update/:id',controller.UpdateBootCamp)

route.delete('/delete/:id',controller.DeleteBootCamp)





module.exports=route