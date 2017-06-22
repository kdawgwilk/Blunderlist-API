const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'Name not long enough'],
        maxlength: [30, 'Name is too long'],
        required: [true, 'Name is required']
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: [true, 'An Item needs a group']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

itemSchema.statics.findByName = function(name, callback) {
  return this.find({ name: new RegExp(name, 'i') }, callback)
}

const itemModel = mongoose.model('Item', itemSchema)

module.exports = itemModel