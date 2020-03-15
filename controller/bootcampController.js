const Bootcamp = require('../model/BootCamp')

const asyncHandler = require('../middleware/async')

const geoCoder = require('../utils/geoCoder')

module.exports.GetBootCamps = asyncHandler(async (req, res, next) => {

    let query;
    const reqQuery = {
        ...req.query
    }




    const removeFields = ['select', 'sort']

    removeFields.forEach(param => delete reqQuery[param])
    let queryStr = JSON.stringify(reqQuery)
    queryStr = queryStr.replace(/\b(g|gte|lt|lte|in)\b/g, match => `$${match}`)

    query = Bootcamp.find(JSON.parse(queryStr)).populate('courses')

    if (req.query.select) {
        const fields = req.query.select.split(',')
        query.select(fields)
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments()

 

    const pagination={}

    if(endIndex<total){
        pagination.next={
            page:page+1,
            limit
        }
    }

    if(startIndex>0){
        pagination.prev={
            page:page-1,
            limit
        }
    }

    query = query.skip(startIndex).limit(limit);
   


    const bootcamps = await query


    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
        pagination,
        message: 'Show all bootcamps'
    })
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