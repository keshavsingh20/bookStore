const express = require('express')
const Book = require('../Model/Book')

const router = express.Router()

router.post('/add', async (req, resp)=> {
    try{
        const book = await Book.create({
            title: req.body.title,
            price: req.body.price,
            author: req.body.author,
            category: req.body.category,
            active: req.body.active,
            image: req.body.image
        })
        const bookData = await book.save();
        resp.send(bookData)
    }
    catch(err) {
        // console.log(err)
        resp.send(err);
    }
})

router.get('/books/details', async(req, resp)=> {
    const books = await Book.find();
    if(books.length > 0) {
        resp.send(books)
    }
    else {
        resp.send({res: "No books found...!"})
    } 
})

router.get('/book/details/:id', async(req, resp)=> {
    const book = await Book.findOne({_id: req.params.id});
    if(book) {
        resp.send(book)
    }
    else {
        resp.send({res: "No books found...!"})
    } 
})

router.put('/update/:id', async (req, resp)=> {
    try{
        const book = await Book.updateOne(
            {_id: req.params.id}, 
            {
                $set: req.body
            }
            );
        resp.send(book)
    }
    catch(err) {
        resp.send(err);
    }
})

router.delete('/delete/:id', async (req, resp)=> {
    try{
        const result = await Book.deleteOne({_id: req.params.id});
        resp.send(result)
    }
    catch(err) {
        // console.log(err)
        resp.send(err)
    }
})


router.get('/search/:key', async (req, resp)=> {
    const searchKey = req.params.key;
    const regex = new RegExp(searchKey, 'i');

    try {
        const result = await Book.find({
            "$or": [
                { title: { $regex: regex } },
                { category: { $regex: regex } },
                { author: { $regex: regex } }
            ]
        });

        resp.json(result);
    } catch (error) {
        resp.status(500).json({ error: 'An error occurred while searching for books.' });
    }
})



module.exports = router;