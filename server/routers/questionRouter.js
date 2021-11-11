import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Question from '../models/questionModel.js'

const questionRouter = express.Router()

questionRouter.get('/', expressAsyncHandler(async (req, res) => {
    const questions = await Question.find({})
    res.send(questions)
}))

questionRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await Question.remove({})
    const createdQuestions = await Question.insertMany(data.questions)
    res.send({ createdQuestions })
}))

questionRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const quesiton = await Question.findById(req.params.id)
    if (product){
        res.send(question)
    }else{
        res.status(404).send({message: 'Question Not Found'})
    }
}))

questionRouter.post("/insert", expressAsyncHandler(async(req, res)=> {
    try{
        const{
            text,
            option,
            answer
        } = req.body;
        const createdQuestion = await Question.insertMany([{
            // platformId: ,
            // quizId: ,
            text: text,
            option: option,
            answer: answer,
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
        }]);
        res.send(createdQuestion);
    } catch(err){
        console.log(err);
        res.send(err);
    }
}));

export default questionRouter