const { continueWithGoogle, sellerRegister, sellerLogin,  adminRegister, sendOtp, adminLogin, adminLogout, UserLogout, sellerLogout } = require("../controllers/auth.contoller")

const router = require("express").Router()
router
.post("/continue-with-google", continueWithGoogle)
.post("/user-logout", UserLogout)

.post("/seller-register", sellerRegister)
.post("/seller-login", sellerLogin)
.post("/seller-logout", sellerLogout)

.post("/admin-register", adminRegister)
.post("/send-otp", sendOtp)
.post("/admin-login", adminLogin)
.post("/admin-logout", adminLogout)

module.exports = router