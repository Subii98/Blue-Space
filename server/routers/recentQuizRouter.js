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

      if (!req.body) {
        return res.status(400).json({
          success: false,
          error: "You must provide feedback",
        });
      }

      const recentQuizElem = new RecentQuizModel({
        userID: userID,
        quizID: quizID,
        name: name,
        correct, correct,
        total, total,
      });

      if (!RecentQuizElem) {
        return res.status(400).json({ success: false, error: err });
      }

      RecentQuizElem
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: RecentQuizElem._id,
            message: "Feedback created!",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: "Feedback not created!",
          });
        });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);



export default recentQuizRouter;
