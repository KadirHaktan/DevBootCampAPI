const Course = require('../model/Course')
const Bootcamp = require('../model/BootCamp')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')


exports.GetCourses = asyncHandler(async (req, res, next) => {
    let query
    if (req.params.bootcampId) {
        query = Course.find({
            bootcamp: req.params.bootcampId
        }).populate("bootcamp")
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        })
    }

    const courses = await query

    res.status(200).json({
        success: true,
        data: courses,
        count: courses.length
    })
})

exports.GetCourseById = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id)
        .populate('bootcamp', 'name description -_id')
        .select('-__v')




    if (!course) {
        return next(new ErrorResponse(`Can not found the course with ${req.params.id} id`, 404))
    }

    res.status(200).json({
        data: course,
        success: true
    })
})

exports.AddCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) {
        return next(
            new ErrorResponse(`No bootcamp with ${req.params.bootcampId}`, 404)
        )
    }

    const course = await Course.create(req.body)

    res.status(200).json({
        success: true,
        data: course
    })
})

exports.UpdateCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
        return next(
            new ErrorResponse(`No bootcamp with ${req.params.id}`, 404)
        )
    }

    const c = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        data: c,
        success: true
    })
})


exports.DeleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
        return next(
            new ErrorResponse(`No bootcamp with ${req.params.id}`, 404)
        )
    }

    await course.remove()
    res.status(200).json({
        data: {},
        success: true
    })
})