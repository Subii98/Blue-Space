import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    // _id: String,
    text: String,
    option: [String],
    answer: Number,
    first: Number,
    second: Number,
    third: Number,
    forth: Number
})

const Question = mongoose.model('Question', questionSchema)

export default Question