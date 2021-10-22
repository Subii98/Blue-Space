import express, { response } from 'express'
import expressAsyncHandler from 'express-async-handler';
import Platform from '../models/platform';

const platformRouter = express.Router()

platformRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const platform = await Platform.find({})
    res.send(Platform)
}))

platformRouter.get('/:id', expressAsyncHandler(async(req, res)=> {
    const createdPlatform = await Platform.insertMany(platform)
    res.send({createdPlatform})
}))

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