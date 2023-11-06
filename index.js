const express = require('express');
const connect = require('./db/config')
const cors = require('cors')
const dotenv = require('dotenv');
const userRouter = require('./router/UserRouter')
const bookRouter = require('./router/BookRouter')
const categoryRouter = require('./router/CategoryRouter')
const orderRouter = require('./router/OrderRouter')
const cartRouter = require('./router/CartRouter')
const paymentRouter = require('./router/PaymentRouter')
const storeRouter = require('./router/StoreRouter')


const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use(express.static('./client/build'))


app.use('/api/user', userRouter)
app.use('/api/book', bookRouter)
app.use('/api/category', categoryRouter)
app.use('/api/order', orderRouter)
app.use('/api/cart', cartRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/store', storeRouter);


connect().then(()=> {
    try{
        app.listen(5000, ()=> {
            console.log(`Server is connected to http://localhost:${port}`)
        })
    }
    catch(err){
        console.log("Can't connect to the server. Some error occured while connecting to the server.")
    }

}).catch((err)=> {
    console.log(err)
    console.log("Invalid Database Connection")
})
