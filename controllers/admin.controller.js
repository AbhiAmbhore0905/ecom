const asyncHandler = require("express-async-handler")
const seller = require("../models/seller")
const Product = require("../models/Product")
const Order = require("../models/Order")
const User = require("../models/User")
const sendEmail = require("../utils/email")

exports.getAllSellers = asyncHandler(async (req,res) => {
    const {limit, start} = req.query
    const total = await seller.countDocuments()
    const result = await seller.find().skip(start).limit(limit)
    res.json({message: "fetch all sellers", result, total})
})

exports.getAllProducts = asyncHandler(async (req,res) => {
    const total = await Product.countDocuments()
    const result = await Product.find()
    res.json({message: "fetch all products", result, total})
})

exports.blockUnblockSellers = asyncHandler(async (req,res) => {
    await seller.findByIdAndUpdate(req.params.sid, {isActive: req.body.isActive})
    res.json({message: "seller account update"})
})

exports.publishUnpublishProduct = asyncHandler(async (req,res) => {
    await Product.findByIdAndUpdate(req.params.pid, {isPublish: req.body.isPublish})
    res.json({message: "product update success"})
})
exports.getAllOrders = asyncHandler(async (req, res) => {
    const total = await Order.countDocuments()
   const {start, limit} = req.query
   const result = await Order.find().populate("user").populate("products.product").skip(start).limit(limit)
    res.json({message : "order fetch success", result, total})
})
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const orderData = await Order.findByIdAndUpdate(req.params.pid, {status: req.body.status})
  const result = await User.findById(orderData.user)
    if (req.body.status === "delivered") {
        await sendEmail({to: result.email, subject:"order status update",
            message: `your order ${result._id} is delivered successfully`
        })
    }
    res.json({message : "order status update"})
})
exports.getAllUser = asyncHandler(async (req, res) => {
    const {start, limit} = req.query
    const total = await User.countDocuments()
   const result = await User.find().skip(start).limit(limit)
    res.json({message : " fetch all users", result, total})
})
exports.blockUnblockUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.params.uid, {isActive: req.body.isActive})
    res.json({message : "users account update"})
})