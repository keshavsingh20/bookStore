const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    book: { type: String, required: true, },
    category: { type: String },
    price: { type: Number, required: true, },
    quantity: { type: Number, required: true, },
    order_date: { type: Date, default: Date.now },
    completion_date: { type: Date },
    status: {
        type: String, // Assuming this should store the order status (e.g., 'pending', 'completed', 'shipped', etc.)
        default: 'Pending'
    },
    customer: {
        userId: { type: String},
        name: { type: String, },
        email: { type: String, },
        phone: { type: Number },
        address: { type: String, },
        state: { type: String },
        country: { type: String },
        pin: { type: String },
    },
    payment: {
        id: {
            type: String, // Assuming this should store the payment ID
        },
        order_id: {
            type: String,
        },
        signature: {
            type: String,
        },
        total: {type: Number},
        status: {
            type: String, // Assuming this should store the payment status (e.g., 'paid', 'pending', 'failed', etc.)
        },
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
