const { instance } = require('../razorPay/RazorPayInstance')
const crypto = require('crypto')
const Order = require('../Model/Order')


const checkout = async (req, resp) => {
    const options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",
        // receipt: "order_rcptid_11"
    };
    const order = await instance.orders.create(options);
    //   console.log(order)

    resp.status(200).json({
        success: true,
        order
    })
}
exports.checkout = checkout;


const paymentVerification = async (req, resp) => {
    // console.log(req.body)

    // resp.status(200).json({
    //     success: true,
    // })

    // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    // req.body;

    const {
      book,
      category,
      price,
      quantity,
      // completion_date,
      // status,
      userId,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      customer_state,
      customer_country,
      customer_pin,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      payment_status,
    } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

    // console.log(expectedSignature)
    // console.log(razorpay_signature)

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
    const newOrder = new Order({
      book,
      category,
      price,
      quantity,
      completion_date: Date.now(),
      // status,
      customer: {
        userId: userId,
        name: customer_name,
        email: customer_email,
        phone: customer_phone,
        address: customer_address,
        state: customer_state,
        country: customer_country,
        pin: customer_pin,
      },
      payment: {
        id: razorpay_payment_id,
        order_id: razorpay_order_id,
        signature: razorpay_signature,
        total: price * quantity,
        status: 'Success',
      },
    });
    const savedOrder = await newOrder.save();
    

    resp.status(200).json({
        success: true,
    });
  } else {

    const newOrder = new Order({
      book,
      category,
      price,
      quantity,
      // completion_date,
      // status,
      customer: {
        userId: userId,
        name: customer_name,
        email: customer_email,
        phone: customer_phone,
        address: customer_address,
        state: customer_state,
        country: customer_country,
        pin: customer_pin,
      },
      payment: {
        id: "",
        order_id: "",
        signature: "",
        status: 'Failed',
      },
    });
    const savedOrder = await newOrder.save();


    resp.status(400).json({
      success: false,
    });
  }
}
exports.paymentVerification = paymentVerification


