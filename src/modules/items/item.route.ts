import express, { Request, Response } from "express";
import { Controller as ItemController } from "./item.controller";

export const router = express.Router();

router.post('/createItem',  async (request: Request, response: Response) => {
    const result = await ItemController.createItem(request);
    response.status(result.status).json(result);
})

router.get('/getItems',  async (request: Request, response: Response) => {
    const result = await ItemController.getItems(request);
    response.status(result.status).json(result);
})

router.delete('/deleteItem/:id', async (request: Request, response: Response) => {
    const result = await ItemController.deleteItem(request);
    response.status(result.status).json(result);
})

router.put('/updateItem/:id', async (request: Request, response: Response) =>{
    const result = await ItemController.updateItem(request);
    response.status(result.status).json(result);
})