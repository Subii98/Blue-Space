import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    //Automatically produced by mongodb
    _id: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    questions:{
        //add question ids
        type: Array
    },
    platformId:{
        //platform id contains this quiz
        type: String
    }
    // questions: {
    //     type: Array,
    //     items: {
    //         type: Object,
    //         properties: {
    //             _id: String,
    //             text: String,
    //             option: [String],
    //             answer: Number,
    //             first: Number,
    //             second: Number,
    //             third: Number,
    //             forth: Number
    //         }
    //     }
    // }
});

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz