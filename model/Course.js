const mongoose=require('mongoose')
const Schema=mongoose.Schema

const CourseSchema=new Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'Please add a course title']
    },
    description:{
        type:String,
        trim:true,
        required:[true,'Please add a course description']
    },
    weeks:{
        type:String,
        trim:true,
        required:[true,'Please add a course weeks']
    },
    tuition:{
        type:Number,
        required:[true,'Please add a course tuition']
    },
    minimumSkill:{
        type:String,
        required:[true,'Please add a course skill'],
        enum:['beginner','intermediate','advanced']
    },
    scholarhipsAvailable:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required:true
    }

})

module.exports=mongoose.model('Course',CourseSchema)