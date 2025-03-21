const { placeOrder, getOrders } = require("../controllers/user.controller")

const router = require("express").Router()
router
.post("/place-order", placeOrder)
.get("/orders", getOrders)


module.exports = router