const { getPublicProducts, getPublicProductDetails } = require("../controllers/public.controller")

const router = require("express").Router()
router
.get("/products",getPublicProducts)
.get("/products-details/:pid",getPublicProductDetails)

module.exports = router