import mongoose from 'mongoose'

const platformSchema = new mongoose.Schema({
    _id: String,
    userId : String,
    name: String,
    description: String,
    subscriber: [String],
    icon: String,
    banner: String,
    fontFamily: String,
    titleFontSize: Number,
    descFontSize: Number,
    fontColor: String,
    tag1: Srtring,
    tag2: String,
    tag3: String,
    quizId: [Number]
})

const Platform = mongoose.model('Platform', platformSchema)

export default Platform