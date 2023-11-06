const express = require('express');
const {checkout, paymentVerification} = require('../controller/PaymentController')


const router = express.Router();


router.route("/checkout", checkout).post(checkout);
router.route("/paymentverification").post(paymentVerification);

router.get("/getkey", (req, resp)=>{
    resp.status(200).json({key: process.env.RAZORPAY_API_KEY})
})


module.exports = router;