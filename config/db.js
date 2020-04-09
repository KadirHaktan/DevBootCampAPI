

const mongoose=require('mongoose')

const connectDb= async ()=>{
    const con=await mongoose.connect("mongodb+srv://Hacktin:8Hn0Hi6JW2FYeJBj@cluster0-daa2m.mongodb.net/devBootCamper?retryWrites=true&w=majority",{
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