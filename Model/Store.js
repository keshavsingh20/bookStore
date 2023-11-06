const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    store_name : {type: String},
    vendor_name : {type: String},
    phone : {type: String},
    store_address : {type: String}
})

const Store = mongoose.model('stores', storeSchema);
module.exports = Store;