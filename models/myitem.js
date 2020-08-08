const mongoose = require('mongoose');
//Create Schema
const myitemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});
//Create and instantiate model with schema
const myitem = mongoose.model("myitem", myitemSchema);
module.exports = myitem;