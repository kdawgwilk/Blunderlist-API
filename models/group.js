const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'Name not long enough'],
        maxlength: [30, 'Name is too long'],
        required: [true, 'Name is required']
    }
})

module.exports = mongoose.model('Group', groupSchema);