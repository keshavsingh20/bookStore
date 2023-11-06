const express = require('express');
const Store = require('../Model/Store')

const router = express.Router();

router.post('/add', async (req, resp) => {
    const { store_name, vendor_name, phone, store_address } = req.body;

    const store = await Store.create({
        store_name,
        vendor_name,
        phone,
        store_address
    })

    const storeData = await store.save();
    resp.status(200).json(storeData)
})

router.get('/all', async(req, resp)=> {
    const stores = await Store.find();
    if(stores.length > 0) {
        resp.send(stores)
    }
    else {
        resp.send({res: "No books found...!"})
    } 
})

router.get('/details/:id', async(req, resp)=> {
    const store = await Store.findOne({_id: req.params.id});
    if(store) {
        resp.send(store)
    }
    else {
        resp.send({res: "No store found...!"})
    } 
})

router.put('/update/:id', async (req, resp) => {
    try{
        const storeData = await Store.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        )
    
        resp.status(200).json(storeData)
    }
    catch(error) {
        resp.send(error)
    }

})

router.delete('/delete/:id', async(req, resp)=>{
    try{
        const result = await Store.deleteOne({_id: req.params.id});
        resp.status(200).json(result);
    }
    catch(err){
        resp.send(err)
    }
})


module.exports = router;