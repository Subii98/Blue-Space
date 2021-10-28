import env from "./env.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import quizRouter from "./routers/quizRouter.js";
import userRouter from "./routers/userRouter.js";
import { exec } from "child_process";
import questionRouter from "./routers/questionRouter.js";


env(); // set enviornment variables
const app = express();
const __dirname = path.resolve();
const ORIGIN = process.env.ORIGIN ? process.env.ORIGIN : "127.0.0.1:3000";
const MONGODB_URL = process.env.MONGODB_URL
    ? process.env.MONGODB_URL
    : "mongodb://localhost/bluespace";


//just gets current user
app.get("/me", async (req, res) => {
  res.status(200);
  res.json(req.user);
});
    
// app.use(logger("dev"));
//localhost:3000/static
app.use("/githubwebhook", (req, res) => {
    exec("cd ./client/ && npm run build"); 
    res.status(200);
});




app.use(
    "/static",
    express.static(path.join(__dirname, "./client/build/static"))
);
app.use(
    "/images",
    express.static(path.join(__dirname, "./client/build/images"))
);
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
    //localhost:3000/api/v1/request
    if (req.path.indexOf("api") != -1) return next();
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

mongoose
    .connect(MONGODB_URL, {
        useNewUrlParser: true,
    })
    .catch((e) => {
        console.error("Connection error", e.message);
    });

app.use("/api/quizzes", quizRouter);
app.use('/api/questions', questionRouter);
app.use("/api/v1", userRouter);
app.get("/", (req, res) => {
    res.send("Server is Ready");
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
