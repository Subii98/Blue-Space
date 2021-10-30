import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Platform from '../models/platform.js';
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
    const platform = await Platform.find({ userId : "0001" }); // db select
    // await Platform.deleteMany(platform[0])
    await Platform.update({userId : "3333"})
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


platformRouter.get("/:id", expressAsyncHandler(async (req, res)=> {
    const platform = await Platform.findById(req.params.id)
    if(platform){
        res.send(platform)
    }
    else{
        res.status(404).send({message: 'Platform Not Found'})
    }
}))

export default platformRouter