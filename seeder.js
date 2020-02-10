const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config({
    path: './config/config.env'
})


const Bootcamp = require('./model/BootCamp')

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
})

const bootcamps = JSON.parse(fs.readFileSync('../devcamper_project_resources/_data/bootcamps.json','utf-8'))

const importData=async()=>{
    try{
        await Bootcamp.create(bootcamps)
        console.log("Data imported...".colors.green.inverse)
        process.exit()
    }
    catch(err){
        console.log(err)
    }
}

const DeleteData=async()=>{
    try{
        await Bootcamp.deleteMany()
        console.log("Data destroyed...".colors.red.inverse)
        process.exit()
    }
    catch(err){
        console.log(err)
    }
}

if(process.argv[2]==='-i'){
    importData()
}
else if(process.argv[2]==='-d'){
    DeleteData()
}