const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    developer: String
});

const Staff = mongoose.model('Staff', personSchema);

module.exports = Staff;
