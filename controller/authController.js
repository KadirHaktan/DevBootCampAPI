const User = require('../model/User')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')


exports.Login = asyncHandler(async (req, res, next) => {
    const {
        email,
        password
    } = req.body


    if (!email || !password) {
        return next(new ErrorResponse('Email or password can not found'), 404)
    }

    const user = await User.findOne({
        email
    }).select('+password')

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials'), 401)
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse('Invalid password'), 401)
    }

    sendTokenResponse(user, 200, res)


})


exports.GetMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        data: {
            user
        }
    })
})


exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    })



    if (!user) {
        return next(new ErrorResponse("User can not found", 404))
    }

    const resetToken = user.getResetPasswordToken()
    
    await user.save({
        validateBeforeSave: false
    })

    const resetUrl = `${req.protocol}//${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`

    const message = `You are receiving this email because you(or someone else) has requested the reset of a password
    .Please make a PUT request to:${resetUrl}`


    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        })

        res.status(200).json({
            success: true,
            message: 'Message sent'
        })
    } catch (err) {
        console.log(err)
        user.getResetPasswordToken = undefined
        user.getResetPasswordExpire = undefined

        await user.save({
            validateBeforeSave: false
        })
        return next(new ErrorResponse("Email could not be sent", 500))
    }


})


exports.ResetPassword = asyncHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    })

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.getResetPasswordExpire = undefined

    await user.save()

    sendTokenResponse(user, 200, res)



})


exports.UpdateUserDetail = asyncHandler(async (req, res, next) => {
    const UpdateFields = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, UpdateFields, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: user
    })
})


exports.UpdatePassword = asyncHandler(async (req, res, next) => {
    const user = User.findById(req.user.id).select("+password")

    if (!(user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401))
    }

    user.password = req.body.newPassword
    await user.save()

    sendTokenResponse(user,200,res)
})




const sendTokenResponse = (user, statusCode, res) => {

    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res.status(statusCode).cookie('t', token, options).json({
        success: true,
        token
    })

}