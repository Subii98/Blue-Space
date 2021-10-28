import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import cookieParser from "cookie-parser";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const userRouter = express.Router();
//authenthication

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);




userRouter.post("/auth/google", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { username, email, id} = ticket.getPayload();

  // Setup stuff
  var query = { _email: req.params.email },
    update = { expire: new Date() },
    options = { upsert: true };

  // Find the document
  User.findOneAndUpdate(query, update, options, function (error, user) {
    if (!error) {
      // If the document doesn't exist
      if (!user) {
        // Create it
        user = new User();
        user.username =  username;
        user.email = email;
        user.id = id;
        user.expire = new Date();
      }
      // Save the document
      user
        .save()
        .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            });
    
      req.session.userId = user.id;
        }
    res.json(user);
  });

  
  res.status(201);
  
});
userRouter.delete("/auth/logout", async (req, res) => {
  await req.session.destroy();
  res.status(200);
  res.json({
    message: "Logged out successfully",
  });
});

export default userRouter;