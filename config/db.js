

const mongoose=require('mongoose')

const connectionString=process.env.MONGO_URI

const connectDb= async ()=>{
    const con=await mongoose.connect(connectionString,{
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