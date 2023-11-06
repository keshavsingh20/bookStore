const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: String },
  category: { type: String, required: true },
  active: { type: String },
  image: { type: String },
});

const Book = mongoose.model("books", bookSchema);

module.exports = Book;
