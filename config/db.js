

const mongoose=require('mongoose')

const connectDb= async ()=>{
    const con=await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Connection success")
    }).catch((error)=>{
        console.log(error.stack)
    })


}

module.exports=connectDb