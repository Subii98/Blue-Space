import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js'
import Quiz from '../models/quizModel.js'

const quizRouter = express.Router();

quizRouter.get('/quiz', 
    expressAsyncHandler(async(req, res) => {
        const createdQuizzes = await Quiz.insertMany(data.quizzes)
        res.send({ createdQuizzes })
    })
)

//quizRouter.put('/quiz/:id', QuizCtrl.updateQuiz)
//quizRouter.get('/quiz/:nid', QuizCtrl.getQuizById)
//quizRouter.get('/quizzes', QuizCtrl.getQuizzes)

export default quizRouter