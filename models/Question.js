const mongoose = require('mongoose')
const random = require('mongoose-simple-random')
// const { ObjectId } = mongoose.Schema

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        trim: true,
        required: true,
        maxlength: 90
    },
    options: [
        String
    ],
    answer: {
        type: Number,
        required: true
    }
})

questionSchema.plugin(random);

module.exports = mongoose.model('Question', questionSchema)