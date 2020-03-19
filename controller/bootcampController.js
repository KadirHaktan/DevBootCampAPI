const Bootcamp = require('../model/BootCamp')
const asyncHandler = require('../middleware/async')
const geoCoder = require('../utils/geoCoder')
const ErrorResponse=require('../utils/ErrorResponse')
const path=require('path')

module.exports.GetBootCamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResult)
})

module.exports.GetBootCampById = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id).populate('bootcamp','name description')
    res.status(200).json({
        success: true,
        data: bootcamp,
        message: `Show to ${req.params.id} bootcamp`
    })

})

module.exports.AddBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(200).json({
        success: true,
        data: bootcamp,
        message: 'Create a new bootcamp'
    })
})


module.exports.UpdateBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: bootcamp,
        message: `Update to ${req.params.id} bootcamp`
    })
})


module.exports.DeleteBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)

    bootcamp.remove()

    res.status(200).json({
        success: true,
        data: {},
        message: `Delete to ${req.params.id} bootcamp`
    })
})

module.exports.GetBootCampByRadius = asyncHandler(async (req, res, next) => {
    const {
        zipcode,
        distance
    } = req.params

    const loc = await geoCoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = loc[0].longitude

    const radius = distance / 3963

    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat], radius
                ]
            }
        }
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

module.exports.UploadBootcampPhoto=asyncHandler(async(req,res,next)=>{
    const bootcamp=Bootcamp.findById(req.params.id)

    if(!bootcamp){
        return next(new ErrorResponse(`Can not found the ${req.params.id} bootcamp`,404))
    }

    if(!req.files){
        return next(new ErrorResponse('Please upload a file',400))
    }

    const file=req.files.file

    if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse('Please upload an image file',400))
    }

    if(file.size>process.env.UPLOAD_MAX_SIZE){
        return next(new ErrorResponse(`Please upload an image less than ${process.env.UPLOAD_MAX_SIZE} `))
    }

    file.name=`photo_${(await bootcamp)._id}${path.parse(file.name).ext}`

    console.log(file)

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`,async(err)=>{
        if(err){
            console.error(err)
            return next(new ErrorResponse('Problem about upload a file',500))
        }
    })

    await bootcamp.findOneAndUpdate(req.params.id,{photo:file.name})

    res.status(200).json({
        success:true,
        data:file.name
    })
})