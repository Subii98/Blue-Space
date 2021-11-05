import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import Platform from "../models/platformModel.js";



const searchRouter = express.Router();


searchRouter.post("/", async (req, res) => {
    console.log('request to search router', req.body);
  var test = "/.*" + req.body.search + ".*/";
  console.log(test);
    Platform.find({ name: test}, (err,item)=>{
        if(err){
            res.send(err);
    }
    console.log(item);
    return res.status(201).json({
      search: item,
      message: "Returned search results!",
    });
})
  
    
});


export default searchRouter;
