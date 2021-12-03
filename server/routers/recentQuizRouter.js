import express from "express";
import expressAsyncHandler from "express-async-handler";
import RecentQuiz from "../models/recentQuizModel.js";

const recentQuizRouter = express.Router();

recentQuizRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const recent = await RecentQuiz.find({});
    res.send(recent);
  })
);

recentQuizRouter.post(
  "/record",
  expressAsyncHandler(async (req, res) => {
    try {
      const { userID, quizID, name, correct, total } = req.body;
      console.log("saved record recent");
      console.log("userID is:", userID);
      console.log("quizID is:", quizID);
      console.log("name is:", name);
      console.log("correct is:", correct);
      console.log("total is:", total);
      
      res.send();
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);



export default recentQuizRouter;
