const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {type: String},
    items: [ 
        {
            bookId: {type: String},
            quantity: {type: Number}
        },
    ]
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart;