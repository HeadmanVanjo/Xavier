const mongoose = require('mongoose')
const { Schema } = mongoose


const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    topics: {
        type: String,
        required: true
    },
    fileupload: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})


const blogPost = mongoose.model('blogPost', blogSchema)
module.exports = blogPost