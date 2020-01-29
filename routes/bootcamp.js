
const express=require('express')
const route=express.Router()
const controller=require('../controller/bootcampController')


route.get('/',controller.GetBootCamps)
route.get('/:id',controller.GetBootCampById)

route.post('/add',controller.AddBootCamp)
route.post('/add/:id',controller.AddBootCampById)

route.put('/update',controller.UpdateBootCamp)
route.put('/update/:id',controller.UpdateBootCampById)

route.delete('/delete',controller.DeleteBootCamp)
route.delete('/delete/:id',controller.DeleteBootCampById)




module.exports=route