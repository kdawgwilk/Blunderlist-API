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

groupSchema.options.toJSON = {
    getters: true,
    virtuals: true,
    transform: function (doc, ret, options) {
      delete ret._id
      delete ret.__v
      return ret
    }
}

module.exports = mongoose.model('Group', groupSchema)