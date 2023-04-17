import express from 'express'
import { ItemRouter } from "./modules/items"

const router = express.Router();

router.get('/',async(req,res) => {
    res.send({status:200,success:true,message:"api call"});
})

router.use('/item', ItemRouter);


export default router;
