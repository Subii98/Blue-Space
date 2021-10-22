import env from "./env.js";
import express from 'express'
import cors from "cors";
import mongoose from 'mongoose'
import data from './data.js';
import path from "path"
import cookieParser from "cookie-parser";
import quizRouter from './routers/quizRouter.js';

env(); // set enviornment variables
const app = express();
const __dirname = path.resolve();
const ORIGIN = process.env.ORIGIN ? process.env.ORIGIN : "127.0.0.1:3000";
const MONGODB_URL = process.env.MONGODB_URL ? process.env.MONGODB_URL : "mongodb://localhost/bluespace";

// app.use(logger("dev"));
app.use("/static",express.static(path.join(__dirname, "./client/build/static")));
app.use("/images",express.static(path.join(__dirname, "./client/build/images")));
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);
app.use(cookieParser());
app.use(
    cors({
        origin: ORIGIN,
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use("/", function (req, res, next) {
    if (req.path.indexOf("api") != -1) return next();
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

mongoose
    .connect(MONGODB_URL, {
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