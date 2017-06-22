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

itemSchema.options.toJSON = {
    getters: true,
    virtuals: true,
    transform: function (doc, ret, options) {
      delete ret._id
      delete ret.__v
      return ret
    }
}

const itemModel = mongoose.model('Item', itemSchema)

module.exports = itemModel