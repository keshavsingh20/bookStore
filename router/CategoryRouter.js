const express = require('express');
const Category = require('../Model/Category')

const router = express.Router()

router.post('/add', async (req, resp) => {
    try {
        const category = await Category.create({
            title: req.body.title,
            image: req.body.image
        })
        const categoryData = await category.save();
        resp.send(categoryData)
    }
    catch (err) {
        // console.log(err)
        resp.send(err);
    }
})

router.get('/details', async (req, resp) => {
    try {
        const categories = await Category.find();
        if (categories.length > 0) {
            resp.send(categories)
        }
    }
    catch (err) {
        resp.send({ res: "No Category Found..!" })
    }
})

router.get('/category/details/:id', async (req, resp) => {
    const category = await Category.findOne({ _id: req.params.id });
    if (category) {
        resp.send(category)
    }
    else {
        resp.send({ res: "No Category found...!" })
    }
})

router.put('/update/:id', async (req, resp) => {
    try {
        const category = await Category.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        );
        resp.send(category)
    }
    catch (err) {
        resp.send(err);
    }
})


router.delete('/delete/:id', async (req, resp)=> {
    try{
        const result = await Category.deleteOne({_id: req.params.id});
        resp.send(result)
    }
    catch(err) {
        // console.log(err)
        resp.send(err)
    }
    
})



module.exports = router;