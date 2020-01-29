

const express=require('express')
const dotenv=require('dotenv')

const bootcamp=require('./routes/bootcamp')

dotenv.config({path:'./config/config.env'})

const app=express()
const PORT=process.env.PORT


app.use('/api/v1/bootcamps',bootcamp)

app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }
})