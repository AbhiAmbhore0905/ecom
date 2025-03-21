const asyncHandler = require("express-async-handler")
const Product = require("../models/Product")

exports.getPublicProducts = asyncHandler(async (req , res)=> {
    const result = await Product.find({ isPublish: true})
    res.json({message: "product fetch success",result})
})

exports.getPublicProductDetails = asyncHandler(async (req , res)=> {
    const result = await Product.findById(req.params.pid)
    res.json({message: "product fetch success", result})
})