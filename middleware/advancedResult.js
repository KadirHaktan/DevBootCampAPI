
const advancedResults=(model,populate,message)=>async(req,res,next)=>{
    let query;
    const reqQuery = {
        ...req.query
    }

    const removeFields = ['select', 'sort']

    removeFields.forEach(param => delete reqQuery[param])
    let queryStr = JSON.stringify(reqQuery)
    queryStr = queryStr.replace(/\b(g|gte|lt|lte|in)\b/g, match => `$${match}`)

    query = model.find(JSON.parse(queryStr))

    if(populate){
        query=query.populate(populate)
    }

    if (req.query.select) {
        const fields = req.query.select.split(',')
        query=query.select(fields)
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit;
    const total = await model.countDocuments()

 

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
    const result = await query

    res.advancedResult={
        success:true,
        data:result,
        message:message,
        pagination
    }
    next()
}

module.exports=advancedResults