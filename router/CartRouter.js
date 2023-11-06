const express = require('express')
const Cart = require('../Model/Cart')
const BookModel = require('../Model/Book')

const router = express.Router();


router.post('/add', async (req, res) => {
    try {
      const { userId, bookId, quantity } = req.body;
      // Validate the user and book IDs
      // we can perform validation and error handling here
  
      // Find the user's cart or create a new cart if it doesn't exist
      let userCart = await Cart.findOne({ userId });
      if (!userCart) {
        userCart = new Cart({ userId, items: [] });
      }
  
      // Check if the item already exists in the cart
      const existingItem = userCart.items.find((item) => item.bookId === bookId);
  
      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity = quantity;
      } else {
        // Add a new item to the cart
        userCart.items.push({ bookId, quantity });
      }
  
      // Save the updated cart
      await userCart.save();
  
      res.status(201).json(userCart);
    } catch (error) {
      // console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  // api to remove item from the cart
  router.delete('/remove/:userId/:bookId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookId = req.params.bookId;
  
      // Find the user's cart
      const userCart = await Cart.findOne({ userId });
  
      if (!userCart) {
        return res.status(404).json({ message: 'User cart not found' });
      }
  
      // Find and remove the item from the cart
      const updatedItems = userCart.items.filter((item) => item.bookId !== bookId);
  
      userCart.items = updatedItems;
  
      // Save the updated cart
      await userCart.save();
  
      res.status(200).json(userCart);
    } catch (error) {
      // console.error('Error removing item from cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  // api to get details of the cart 
  router.get('/all/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find the user's cart
      const userCart = await Cart.findOne({ userId });
  
      if (!userCart) {
        return res.status(404).json({ message: 'User cart not found' });
      }
  
      // Get book data for each item in the cart
      const cartItems = userCart.items;
  
      // You can fetch book details based on the `bookId` for each item here
      // Assuming you have a Book model and can retrieve book details by ID
  
      const cartWithBookData = await Promise.all(
        cartItems.map(async (item) => {
          // Retrieve book details based on `item.bookId`
          // You'll need to implement this part based on your Book schema
          // Replace BookModel.findOne with your actual query
          const bookDetails = await BookModel.findOne({ _id: item.bookId });
  
          // Return a new object combining book data and cart data
          return {
            bookDetails,
            quantity: item.quantity,
          };
        })
      );
  
      res.status(200).json(cartWithBookData);
    } catch (error) {
      // console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports = router;