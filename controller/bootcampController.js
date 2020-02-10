const Bootcamp = require('../model/BootCamp')

const asyncHandler = require('../middleware/async')

const geoCoder = require('../utils/geoCoder')

module.exports.GetBootCamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find(req.query)
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
        message: 'Show all bootcamps'
    })

})



module.exports.GetBootCampById = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
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
    res.status.json({
        success: true,
        data: bootcamp,
        message: `Update to ${req.params.id} bootcamp`
    })
})


module.exports.DeleteBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    res.status.json({
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