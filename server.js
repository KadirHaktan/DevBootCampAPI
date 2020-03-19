

const express=require('express')
const dotenv=require('dotenv')
const fileupload=require('express-fileupload')
const path=require('path')
const cookieParser=require('cookie-parser')
//Requirment packages

const bootcamp=require('./routes/bootcamp')
const course=require('./routes/course')
const user=require('./routes/user')
const auth=require('./routes/auth')
//routes


const logger=require('./middleware/logger')
const morgan=require('morgan')
const errorHandler=require('./middleware/error')
//Middlewares


const ConnectionDb=require('./config/db')

dotenv.config({path:'./config/config.env'})

const app=express()
const PORT=process.env.PORT
//server components

ConnectionDb()

app.use(express.json())

app.use(cookieParser())

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(fileupload())
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/v1/bootcamps',bootcamp)
app.use('/api/v1/courses',course)
app.use('/api/v1/user',user)
app.use('/api/v1/auth',auth)
//use the routes with middleware

app.use(errorHandler)

const server=app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }
})

process.on('unhandledRejection',(err,promise)=>{
    console.log(err)
    server.close(()=>process.exit(1))
})



