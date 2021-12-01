import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import Counter from "../models/counterModel.js";
import cookieParser from "cookie-parser";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const userRouter = express.Router();
const clientId =
  "506755665568-6jjmmjkcpuc4of62a2s5idulrbuebr69.apps.googleusercontent.com";
userRouter.use(cookieParser());
//authenthication

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(clientId);

userRouter.get('/', expressAsyncHandler(async (req, res) => {
  const users = await User.find({})
  res.send(users)
}))

userRouter.post("/auth/google", async (req, res) => {
  console.log("entered auth google");
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const { name, email, picture } = ticket.getPayload();
  const payload = ticket.getPayload;
  console.log("payload: ", payload);
  console.log(ticket);
  console.log(req.body);
  console.log("email: ", email);
  console.log("name: ", name);

  // Setup stuff
  console.log(req.params.email);
  var query = { email: email },
    update = { expire: new Date() },
    options = { upsert: true };
  //req.session.email = email;
  // Find the document
  var currentUserCounter = 0;
  const userCounter = Counter.findOne(
    { name: "user" },
    function (error, userCnt) {
      if (!error) {
        if (!userCnt) {
          //create a new counter
          userCnt = new Counter({ name: "user", counter: 0 });
        }
        currentUserCounter = userCnt.counter;

        userCnt
          .save()
          .then(() => {
            //console.log("new user cnt: ", currentUserCounter);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  );

  const loggedUser = User.findOne(query, function (error, user) {
    /*
    const userCounter = Counter.findOne(
      { name: "user" },
      function (error, userCnt) {
        if (!error) {
          if (!userCnt) {
            //create a new counter
            userCnt = new Counter({ name: "user", counter: 0 });
          }
          userCnt.counter = userCnt.counter + 1;
          userCnt
            .save()
            .then(() => {
              console.log("new user cnt: ", userCnt.counter);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    );
    */

    console.log("find one and update");
    console.log("error:", error);
    console.log("next is error msg: ");

    if (!error) {
      // If the document doesn't exist
      console.log("no errors");
      console.log(user);
      console.log(!user);
      // console.log(user.length == 0);
      if (!user) {
        // Create it
        console.log("entered create user");
        var randomName = "";
        randomName += name.toLowerCase();
        randomName = randomName.replace(/\s+/g, "");
        randomName += Math.floor(Math.random() * 100 + 1);
        console.log("randomname: ", randomName);

        console.log("current user cnt is: ", currentUserCounter);
        user = new User({
          username: randomName,
          expire: new Date(),
          email: email,
          uniqueId: currentUserCounter,
          points: 100,
          subscribedPlatforms: [],
          exp: 0,
          quizPlayed: 0,
          badge: "",
          title: "Newbie",
          correct: 0,
          totalQuestions: 0,
          playCount: 0,
          level: 1
        });
        console.log("saved user: ", user);
        console.log("username: ", user.username);
        console.log("email: ", user.email);
        console.log("email retrieived: ", email);
        console.log("id: ", user._id);
        console.log("uniqueid: ", user.uniqueId);

        const userCounter = Counter.findOne(
          { name: "user" },
          function (error, userCnt) {
            if (!error) {
              if (!userCnt) {
                //create a new counter
                userCnt = new Counter({ name: "user", counter: 1 });
              }
              userCnt.counter = userCnt.counter + 1;
              currentUserCounter = userCnt.counter;

              userCnt
                .save()
                .then(() => {
                  console.log("new user cnt: ", currentUserCounter);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        );
      }
      // Save the document

      console.log("saving username: ", user.username);
      console.log("what user", user);
      user
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: user._id,
            username: user.username,
            email: user.email,
            actualName: name,
            message: "User updated!",
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(404).json({
            error,
            testUser: user,
            message: "User not updated!",
          });
        });

      /*
      if (!user.id){
        req.session.userId = user.id;
      }
      if (!user.email){
        req.session.email = user.email;
      }  */
      //res.json(user);
    }
    /*
      if (!loggedUser){
        var randomName = "";
        randomName += name.toLowerCase();
        randomName = randomName.replace(/\s+/g, '');
        randomName += Math.floor((Math.random() * 100) + 1);
        console.log("randomname: ", randomName);
        newUser = new User({username: randomName, expire: new Date(), _email: email})
        const createdUser = await User.insert(newUser);
      }else {
        const updateUser = 
      } */
    //console.log("logged user var: ", loggedUser);
  });
});
userRouter.delete("/auth/logout", async (req, res) => {
  //await req.session.destroy();
  res.status(200);
  res.json({
    message: "Logged out successfully",
  });
});

userRouter.put("/createuser", async (req, res) => {
  console.log("entered create user");
  if (!req.session.email) {
    await req.session.destroy();
    res.redirect("/");
  }
});

userRouter.get(
  "/test/idget",
  expressAsyncHandler(async (req, res) => {
    const user = await User.find({ _id: "61957c03a4e8b287fc962577" });
    const updateuser = await User.updateOne(
      { _id: "61957c03a4e8b287fc962577" },
      { $push: { subscribedPlatforms: "abcde" } }
    );
    res.send(updateuser);
  })
);

userRouter.post(
  "/subscribe",
  expressAsyncHandler(async (req, res) => {
    const { userId, platformId } = req.body;
    const updateuser = await User.updateOne(
      { _id: userId },
      { $addToSet: { subscribedPlatforms: platformId } }
    );
    res.send(updateuser);
  })
);

userRouter.post(
  "/unsubscribe",
  expressAsyncHandler(async (req, res) => {
    const { userId, platformId } = req.body;
    const updateuser = await User.updateOne(
      { _id: userId },
      { $pull: { subscribedPlatforms: platformId } }
    );
    res.send(updateuser);
  })
);

userRouter.get(
  "/test/iddelete",
  expressAsyncHandler(async (req, res) => {
    const user = await User.find({ _id: "61957c03a4e8b287fc962577" });
    const updateuser = await User.updateOne(
      { _id: "61957c03a4e8b287fc962577" },
      { $pull: { subscribedPlatforms: "abcde" } }
    );
    res.send(updateuser);
  })
);

userRouter.get(
  "/get_user",
  expressAsyncHandler(async (req, res) => {
    const { user_id } = req.query;
    const user = await User.findOne({ _id: user_id });
    res.send(user);
  })
);

userRouter.post(
  "/set_username",
  expressAsyncHandler(async (req, res) => {
    const { newName, userId } = req.body;
    const existUser = await User.findOne({ username : newName });
    if(existUser){
      return res.send({err : "exist user"});
    }
    const modifyUser = await User.updateOne(
      { _id: userId },
      {
        $set: {
          username: newName,
        },
      }
    );
    res.send({ modifyUser });
  })
);

userRouter.post(
  "/editPoints",
  expressAsyncHandler(async (req, res) => {
    const { points, userId, correct, totalQuestions, playCount, exp, level } = req.body;

    const editUser = await User.updateOne(
      { _id: userId },
      {
        $set: {
          points: points,
          correct: correct,
          totalQuestions: totalQuestions,
          playCount: playCount,
          exp: exp,
          level: level
        },
      }
    );
    res.send(editUser);
  })
);

userRouter.post(
  "/editBadge",
  expressAsyncHandler(async (req, res) => {
    const { badge, points, userId } = req.body;

    const editUserBadge = await User.updateOne(
      { _id: userId },
      {
        $set: {
          badge: badge,
          points: points,
        },
      }
    );
    res.send(editUserBadge);
  })
);

userRouter.post(
  "/editTitle",
  expressAsyncHandler(async (req, res) => {
    const { title, points, userId } = req.body;

    const editUserTitle = await User.updateOne(
      { _id: userId },
      {
        $set: {
          title: title,
          points: points,
        },
      }
    );
    res.send(editUserTitle);
  })
);

export default userRouter;
