const mongoose=require('mongoose')
const Schema=mongoose.Schema


const ReviewSchema=new Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'Please add a title'],
        maxlength:100
    },
    text:{
        type:String,
        required:[true,'Please add a text']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'Please add a rating between 1 and 10']
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

ReviewSchema.statics.getAverageCost=async function(bootcampId){
    const obj=await this.aggregate([
        {
            $match:{bootcamp:bootcampId}
        },
        {
            $group:{
                _id:'$bootcamp',
                avarageRating:{$avg:'$rating'}
            }
        }
    ])

    try{
       await  this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
            avarageRating:obj[0].avarageRating
        })
    }
    catch(err){
        console.error(err)
    }
    
    
    ReviewSchema.post('save',function(){
        this.constructor.getAverageCost(this.bootcamp)
    })
    
    ReviewSchema.pre('remove',function(){
        this.constructor.getAverageCost(this.bootcamp)
    })

}

ReviewSchema.index({bootcamp:1,user:1},{unique:true})

module.exports=mongoose.model('Review',ReviewSchema)

