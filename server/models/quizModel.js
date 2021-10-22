import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    _id: String,
    text: String,
    option: [String],
    answer: Number,
    first: Number,
    second: Number,
    third: Number,
    forth:Number
})

const quizSchema = new mongoose.Schema({
    _id: {
        type: String
        //unique: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    questions: {
        type: Array,
        items: {
            type: Object,
            properties: {
                _id: String,
                text: String,
                option: [String],
                answer: Number,
                first: Number,
                second: Number,
                third: Number,
                forth: Number
            }
        }
    }
});

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz