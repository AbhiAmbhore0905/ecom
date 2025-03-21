const asyncHandler = require("express-async-handler")
const { productUpload } = require("../utils/upload")
const cloud = require("./../utils/cloudinary")
const Product = require("../models/Product")
const path = require("path")

exports.addProducts = asyncHandler(async (req, res) => {
    productUpload(req, res, async err => {
        if (err) {
            console.log(err)
            return res.status(400).json({message: "multer error", error: err.message})
        }
        // console.log(req.files)
        // console.log(req.body)
        const img = []
        for (const item of req.files)  {
            const {secure_url} = await cloud.uploader.upload(item.path)
            img.push(secure_url)
        }
        await Product.create({...req.body, images: img, seller: req.user})
       res.json({ message: "product create success"})
    })
})

exports.getProducts = asyncHandler(async (req, res) => {
    const result = await Product.find({seller: req.user})
    res.json({ message: "product fetch success", result})
})

exports.updateProducts = asyncHandler(async (req, res) => {
    res.json({ message: "product update success"})
})

exports.deleteProducts = asyncHandler(async (req, res) => {
    const {pid} = req.params
    const result = await Product.findById(pid)

    for (const item of result.images) {
        await cloud.uploader.destroy(path.basename(item).split(".")[0])
    }
    await Product.findByIdAndDelete(pid)
    res.json({ message: "product delete success"})
})