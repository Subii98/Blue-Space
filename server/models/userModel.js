import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },

  expire: {
    type: Date,
  },
  /*
    point: {
        type: Number
    }, 
    */
  email: {
    type: String,
    unique: true,
  },
  id: {
    type: Number,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema)

export default User
