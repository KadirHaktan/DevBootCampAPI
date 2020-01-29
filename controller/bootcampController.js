

module.exports.GetBootCamps=(req,res,next)=>{
    res.status(200).json({success:true,message:'Show all bootcamps'})
}

module.exports.GetBootCampById=(req,res)=>{
    res.status(200).json({success:true,message:`Show to ${req.params.id} bootcamp`})
}

module.exports.AddBootCamp=(req,res,next)=>{
    res.status(200).json({success:true,message:'Create new bootcamp'})
}

module.exports.AddBootCampById=(req,res,next)=>{
    res.status(200).json({success:true,message:`Create ${req.params.id} bootcamp`})
}

module.exports.UpdateBootCamp=(req,res,next)=>{
    res.status(200).json({success:true,message:'Update bootcamp'})
}

module.exports.UpdateBootCampById=(req,res,next)=>{
    res.status(200).json({success:true,message:`Update ${req.params.id} bootcamp`})
}

module.exports.DeleteBootCamp=(req,res,next)=>{
    res.status(200).json({success:true,message:'Delete  bootcamp'})
}

module.exports.DeleteBootCampById=(req,res,next)=>{
    res.status(200).json({success:true,message:`Delete ${req.params.id} bootcamp`})
}