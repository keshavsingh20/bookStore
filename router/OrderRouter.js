const express = require('express');
const Order = require('../Model/Order')

const router = express.Router();

// below code moved to Payment Controller with modifications

// router.post('/add', async (req, resp)=> {
//     try {
//         // Extract order data from the request body
//         const {
//           book,
//           category,
//           price,
//           quantity,
//           completion_date,
//           status,
//           customer_name,
//           customer_email,
//           customer_phone,
//           customer_address,
//           customer_state,
//           customer_country,
//           customer_pin,
//           payment_id,
//           payment_status,
//         } = req.body;
    
//         // Create a new order using the Order model
//         const newOrder = new Order({
//           book,
//           category,
//           price,
//           quantity,
//           completion_date,
//           status,
//           customer: {
//             name: customer_name,
//             email: customer_email,
//             phone: customer_phone,
//             address: customer_address,
//             state: customer_state,
//             country: customer_country,
//             pin: customer_pin,
//           },
//           payment: {
//             id: payment_id,
//             status: payment_status,
//           },
//         });
    
//         // Save the new order to the database
//         const savedOrder = await newOrder.save();
    
//         resp.status(201).json(savedOrder);
//       } catch (error) {
//         console.error('Error adding order:', error);
//         resp.status(500).json({ error: 'Internal Server Error' });
//       }
// })


// API to get all orders
router.get('/all', async (req, resp) => {
    try {
      const orders = await Order.find();
      resp.status(200).json(orders);
    } catch (error) {
      // console.error('Error fetching orders:', error);
      resp.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/orders/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const orders = await Order.find({ 'customer.userId': userId });
      res.json(orders);
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error: 'Failed to retrieve orders.' });
    }
  });

  // API to update the status of an order
router.put('/update/:id', async (req, resp) => {
    try {
      const orderId = req.params.id;
      const { status } = req.body;
  
      // Update the order status in the database
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $set: { status , completion_date: Date.now()} },
        { new: true }
      );
  
      if (!updatedOrder) {
        return resp.status(404).json({ message: 'Order not found' });
      }
  
      resp.status(200).json(updatedOrder);
    } catch (error) {
      // console.error('Error updating order status:', error);
      resp.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;