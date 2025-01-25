const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true })

//requirement: title, status, creation date, progress(new, in progress, completed)

module.exports = mongoose.model('Task', taskSchema)