import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Platform from '../models/platformModel.js';
import data from '../data.js';

const platformRouter = express.Router()

platformRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const platform = await Platform.find({}); // db select
    res.send(platform);
}))

platformRouter.get('/test/insert', expressAsyncHandler(async(req, res)=> {
    const createdPlatform = await Platform.insertMany(data.platform) // data.js dbinsert
    res.send({createdPlatform})
}))

platformRouter.get('/test/select', expressAsyncHandler(async(req, res)=> {
    const platform = await Platform.find({ name : "abc" }); // db select
    // await Platform.deleteMany(platform[0])
    // await Platform.updateOne({userId : "3333"})
    res.send(platform)
}));

platformRouter.post("/insert", expressAsyncHandler(async(req, res)=> {
    try{
        const {
            userId ,
            name,
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
        const createdPlatform = await Platform.insertMany([{
            userId  : userId ,
            name : name,
            description : description,
            subscriber : subscriber,
            icon : icon,
            banner : banner,
            fontFamily : fontFamily,
            titleFontSize : titleFontSize,
            descFontSize : descFontSize,
            fontColor : fontColor,
            tag1 : tag1,
            tag2 : tag2,
            tag3 : tag3,
            quizId : quizId,
        }]); 
        res.send(createdPlatform);
    } catch(err){
        console.log(err);
        res.send(err);
    }
}));

platformRouter.get("/:userId", expressAsyncHandler(async (req, res)=> {
    const platform = await Platform.findById(req.params.userId)
    if(platform){
        res.send(platform)
    }
    else{
        res.status(404).send({message: 'Platform Not Found'})
    }
}));

platformRouter.get("/:name", expressAsyncHandler(async (req, res)=> {
    const platform = await Platform.find({ name : req.params.name }) 
    if(platform){
        res.send(platform)
    }
    else{
        res.status(404).send({message: 'Platform Not Found'})
    }
}));

platformRouter.delete("/delete/:userId", expressAsyncHandler(async (req, res)=> {
    const platform = await Platform.findById(req.params.userId)
    if(platform){
        const delPlatform = await Platform.deleteOne(platform)
        res.send({message: 'plaform deleted'})
    }
    else{
        res.status(404).send({message: 'Platform Not Found'})
    }
}));

platformRouter.put("/update/:userId", expressAsyncHandler(async (req, res)=> {
    const platform = await Platform.findById(req.params.userId)
    if(platform){
        await Platform.updateOne({_id: req.params.userId}, )
        res.send({message: 'plaform deleted'})
    }
    else{
        res.status(404).send({message: 'Platform Not Found'})
    }
}));

export default platformRouter