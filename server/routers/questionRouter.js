import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Question from "../models/questionModel.js";

const questionRouter = express.Router();

questionRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const questions = await Question.find({});
        res.send(questions);
    })
);

questionRouter.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
        //await Question.remove({})
        const createdQuestions = await Question.insertMany(data.questions);
        res.send({ createdQuestions });
    })
);

questionRouter.get(
    "/get_question/:id",
    expressAsyncHandler(async (req, res) => {
        const question = await Question.find({ quizId: req.params.id });
        if (question) {
            res.send(question);
        } else {
            res.status(404).send({ message: "Question Not Found" });
        }
    })
);

questionRouter.post(
    "/insert",
    expressAsyncHandler(async (req, res) => {
        try {
            const { text, option, answer, quizId } = req.body;
            const createdQuestion = await Question.insertMany([
                {
                    quizId,
                    text: text,
                    option: option,
                    answer: answer,
                    first: 0,
                    second: 0,
                    third: 0,
                    forth: 0,
                },
            ]);
            res.send(createdQuestion);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    })
);

questionRouter.post(
  "/upsert",
  expressAsyncHandler(async (req, res) => {
      try {
          const { text, option, answer, quizId, questionNum } = req.body;
          const questionRes = Question.findOne({questionNum:questionNum}, function (error, question) {
  if (!error) {
    // If the document doesn't exist
    if (!question) {
      question = new Question({quizId,
                  questionNum: questionNum,
                  text: text,
                  option: option,
                  answer: answer,
                  first: 0,
                  second: 0,
                  third: 0,
                  forth: 0,});
    } else {
      question.questionNum = questionNum;
      question.text = text;
      question.option = option;
      question.answer = answer;
    }
    // Save the document
    question
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "Question Updated!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          error,
          testQuestion: question,
          message: "Question not updated!",
        });
      });

  }
});
          //res.send(questionRes);
      } catch (err) {
          console.log(err);
          res.send(err);
      }
  })
);

export default questionRouter;
