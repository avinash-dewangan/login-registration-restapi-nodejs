const mongoose = require('mongoose')
const Schema = mongoose.Schema


const totoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    added_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Todo = mongoose.model('todo', totoSchema)