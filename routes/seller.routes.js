const { addProducts, getProducts, updateProducts, deleteProducts } = require("../controllers/seller.controller")

const router = require("express").Router()
router
.post("/add-products", addProducts)
.get("/get-products", getProducts)
.patch("/update-products/:pid", updateProducts)
.delete("/delete-products/:pid", deleteProducts)

module.exports = router