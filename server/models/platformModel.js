import mongoose from 'mongoose'

const platformSchema = new mongoose.Schema({
    // userId : String,
    userName: String,
    // name: String,
    title: String,
    description: String,
    subscriber: [String],
    icon: String,
    banner: String,
    fontFamily: String,
    titleFontSize: Number,
    descFontSize: Number,
    fontColor: String,
    tag1: String,
    tag2: String,
    tag3: String,
    quizId: [Number]
});

const Platform = mongoose.model('Platform', platformSchema)

export default Platform