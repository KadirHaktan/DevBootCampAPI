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
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required:true
    }

})

CourseSchema.statics.getAverageCost=async function(bootcampId){
    const obj=await this.aggregate([
        {
            $match:{bootcamp:bootcampId}
        },
        {
            $group:{
                _id:'$bootcamp',
                averageCost:{$avg:'$tuition'}
            }
        }
    ])

    try{
       await  this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
            averageCost:Math.ceil(obj[0].averageCost)
        })
    }
    catch(err){
        console.error(err)
    }
    
    
    CourseSchema.post('save',function(){
        this.constructor.getAverageCost(this.bootcamp)
    })
    
    CourseSchema.pre('remove',function(){
        this.constructor.getAverageCost(this.bootcamp)
    })

}



module.exports=mongoose.model('Course',CourseSchema)