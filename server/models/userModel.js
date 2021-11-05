import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    //unique: true,
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
    //unique: true,
  },
  uniqueId: {
    type: Number,
  },
});



const User = mongoose.model("User", userSchema)

export default User
