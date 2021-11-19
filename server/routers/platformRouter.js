import express from "express";
import expressAsyncHandler from "express-async-handler";
import Platform from "../models/platformModel.js";
import data from "../data.js";
import QuizModel from "../models/quizModel.js";

const platformRouter = express.Router();

platformRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({}); // db select
        res.send(platform);
    })
);

platformRouter.get(
    "/test/insert",
    expressAsyncHandler(async (req, res) => {
        const createdPlatform = await Platform.insertMany(data.platform); // data.js dbinsert
        res.send({ createdPlatform });
    })
);

platformRouter.get(
    "/test/update",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({ _id: "618bff04ec6c011eaf2092cc" });
        const editPlatform = await Platform.updateOne(
            { _id: "618bff04ec6c011eaf2092cc" },
            { $set: { title: "newtitle2" } }
        );
        res.send(editPlatform);
    })
);

platformRouter.get(
    "/test/select",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({ userName: { $eq: "subinpark22" } }); // db select
        res.send(platform);
    })
);

platformRouter.post(
    "/insert",
    expressAsyncHandler(async (req, res) => {
        try {
            const {
                userId ,
                userName,
                title,
                description,
                subscriber,
                icon,
                banner,
                fontFamily,
                titleFontSize,
                descFontSize,
                fontColor,
                tag1,
                tag2,
                tag3,
                quizId,
            } = req.body;
            const createdPlatform = await Platform.insertMany([
                {
                    userId  : userId ,
                    userName: userName,
                    // name : name,
                    title: title,
                    description: description,
                    subscriber: subscriber,
                    icon: icon,
                    banner: banner,
                    fontFamily: fontFamily,
                    titleFontSize: titleFontSize,
                    descFontSize: descFontSize,
                    fontColor: fontColor,
                    tag1: tag1,
                    tag2: tag2,
                    tag3: tag3,
                    quizId: quizId,
                },
            ]);
            res.send(createdPlatform);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    })
);

// platformRouter.get(
//     "/:userId",
//     expressAsyncHandler(async (req, res) => {
//         const platform = await Platform.findById(req.params.userId);
//         if (platform) {
//             res.send(platform);
//         } else {
//             res.status(404).send({ message: "Platform Not Found" });
//         }
//     })
// );

platformRouter.get(
    "/:userId",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({userId: req.params.userId});
        if (platform) {
            res.send(platform);
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);

platformRouter.get(
    "/name/:userName",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({ userName: req.params.userName });
        if (platform) {
            res.send(platform);
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);


platformRouter.get(
    "/by_id/:_id",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.findById(req.params._id);
        if (platform) {
            res.send(platform);
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);

platformRouter.delete(
    "/delete/:userId",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.findById(req.params.userId);
        if (platform) {
            const delPlatform = await Platform.deleteOne(platform);
            res.send({ message: "plaform deleted" });
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);

platformRouter.post(
    "/edit",
    expressAsyncHandler(async (req, res) => {
        const {
            // userId ,
            // userName,
            title,
            description,
            // subscriber,
            // icon,
            banner,
            // fontFamily,
            // titleFontSize,
            // descFontSize,
            fontColor,
            tag1,
            tag2,
            tag3,
            // quizId,
            platformId
        } = req.body;

        const editPlatform = await Platform.updateOne(
            { _id: platformId },
            {
                $set: {
                    title : title,
                    description: description,
                    // subscriber,
                    // icon,
                    banner: banner,
                    // fontFamily,
                    // titleFontSize,
                    // descFontSize,
                    fontColor: fontColor,
                    tag1: tag1,
                    tag2: tag2,
                    tag3: tag3
                },
            }
        );
        res.send(editPlatform)
    })
);

platformRouter.put(
    "/update/:userId",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.findById(req.params.userId);
        if (platform) {
            await Platform.updateOne({ _id: req.params.userId });
            res.send({ message: "plaform deleted" });
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);

export default platformRouter;
