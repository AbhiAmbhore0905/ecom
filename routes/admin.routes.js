const { getAllProducts, getAllSellers, publishUnpublishProduct, blockUnblockSellers, getAllOrders, getAllUser, blockUnblockUser, updateOrderStatus } = require("../controllers/admin.controller")

const router = require("express").Router()
router
.get("/products", getAllProducts)
.get("/sellers", getAllSellers)
.patch("/product-update/:pid", publishUnpublishProduct)
.patch("/seller-update/:sid", blockUnblockSellers)
.get("/getorders", getAllOrders)

.patch("/update-order-status/:pid", updateOrderStatus)
.get("/users", getAllUser)
.patch("/update-user-account/:uid", blockUnblockUser)

module.exports = router