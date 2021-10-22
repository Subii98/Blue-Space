import express from 'express'
import mongoose from 'mongoose'
import data from './data.js';
import quizRouter from './routers/quizRouter.js';

const app = express();

const URI = "mongodb+srv://admin:adminpassword@bluespace.mloto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const URIL = "mongodb://localhost/bluespace"

mongoose
    .connect(process.env.MONGODB_URL || URIL, {
        useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
})


app.get('/api/questions/:id', (req, res) => {
    const question = data.questions.find((x) => x._id === req.params.id)
    if (question){
        res.send(question)
    } else {
        res.status(404).send({ message: 'Question Not Found'})
    }
})

app.get('/api/questions', (req, res) => {
    res.send(data.questions)
})
app.use('/api/quizzes', quizRouter)
app.get('/', (req, res) => {
    res.send('Server is Ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message})
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});