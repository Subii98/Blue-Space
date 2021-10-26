import mongoose, { mongo } from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    exp: {
        type: Number
    },
    point: {
        type: Number
    },
    
