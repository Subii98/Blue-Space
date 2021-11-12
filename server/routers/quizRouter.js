import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js'
import Quiz from '../models/quizModel.js'

const quizRouter = express.Router();

quizRouter.get('/', expressAsyncHandler(async (req, res) => {
    const quizzes = await Quiz.find({})
    res.send(quizzes)
}))

quizRouter.get('/seed', 
    expressAsyncHandler(async(req, res) => {
        //await Quiz.remove({})
        const createdQuizzes = await Quiz.insertMany(data.quizzes)
        res.send({ createdQuizzes });
    })
)

quizRouter.get(
    '/get_quiz/:id', 
    expressAsyncHandler(async (req, res) => {
        const quiz = await Quiz.findById(req.params.id)
        if (quiz){
            res.send(quiz)
        }else{
            res.status(404).send({message: 'Quiz Not Found'})
        }
    })
);

quizRouter.post(
    "/insert",
    expressAsyncHandler(async (req, res) => {
        try{
            const { title, description, platformId } = req.body;
            const createdQuiz = await Quiz.insertMany([
                {
                    platformId,
                    // quizId: ,
                    title,
                    description
                },
            ]);
            res.send(createdQuiz);
        } catch (err){
            console.log(err);
            res.send(err);
        }
    })
);

//quizRouter.put('/quiz/:id', QuizCtrl.updateQuiz)
//quizRouter.get('/quiz/:nid', QuizCtrl.getQuizById)
//quizRouter.get('/quizzes', QuizCtrl.getQuizzes)

export default quizRouter