const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {type: String},
    image: {type: String}
})

const Category = mongoose.model('categories', categorySchema);
module.exports = Category;