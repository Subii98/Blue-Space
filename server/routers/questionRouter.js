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
    "/edit",
    expressAsyncHandler(async (req, res) => {
        const {
            quizId,
            text,
            option,
            answer,
            first,
            second,
            third,
            fourth,
            questionId
        } = req.body;

        const editQuestion = await Question.updateOne(
            { _id: questionId },
            {
                $set: {
                    quizId: quizId,
                    text: text,
                    option: option,
                    answer: answer,
                    first: first,
                    second: second,
                    third: third,
                    fourth: fourth
                },
            }
        );
        res.send(editQuestion)
    })
)
export default questionRouter;
