const Razorpay = require('razorpay');

// instantiate the razorpay instance 
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });



  exports.instance = instance;