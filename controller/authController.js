const User = require('../model/User')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')


exports.Login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password) {
        return next(new ErrorResponse('Email or password can not found', 404))
    }

    const user = await User.findOne({
        email
    }).select('+password')
    console.log(user)

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 400))
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
        return next(new ErrorResponse('Invalid Password', 401))
    }

    sendTokenResponse(user,200,res)

})


exports.GetMe=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        data:{
            user
        }
    })
})

const sendTokenResponse=(user,statusCode,res)=>{

    const token = user.getSignedJwtToken()
    const options={
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    }

    if(process.env.NODE_ENV==='production'){
        options.secure=true
    }

    res
    .status(statusCode)
    .cookie('t',token,options)
    .json({
        success:true,
        token
    })

}

