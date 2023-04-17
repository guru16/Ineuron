import { Request } from "express";
import { Types } from "mongoose";
import {Items} from './item.model'
import {Dal as ItemDal} from './item.dal'
import { ItemError, ItemResult } from '../../utils';

class itemsController {
    async createItem(req: Request):Promise<ItemResult> {
        const {
            itemName,
            itemCode,
            itemType,
            sku,
            quantity,
            price,
        } = req.body
        if (!itemName || !price || quantity == '') {
            throw new ItemError(400, 'Missing Parameters');
        }
        const itemData = new Items({
            itemName,
            itemCode,
            itemType,
            sku,
            quantity,
            price,
        })
        let items = await ItemDal.createItem(itemData);
        const result = new ItemResult(200, 'Item created successfully', { items });
        return result;
    }

    async getItems(req: Request):Promise<ItemResult> {
        let items = await ItemDal.getItems();
        const result = new ItemResult(200, 'Item List', { items });
        return result;

    }

    async deleteItem(req: Request): Promise<ItemResult>{
        const { id }  = req.params
        const isItem = await Items.findOne({_id: new Types.ObjectId(id)});
        if(isItem){
            let items = await ItemDal.deleteItem(id);
            const result = new ItemResult(200, 'Delete Item Successfully', { items });
            return result;
        }else{
            throw new ItemError(404, 'Item not found');

        }       
    }

    async updateItem(req: Request): Promise<ItemResult>{
        const { id }  = req.params
        const {
            itemName,
            itemCode,
            itemType,
            sku,
            quantity,
            price,
        } = req.body
        if (!itemName || !price || quantity == '') {
            throw new ItemError(400, 'Missing Parameters');
        }
        const itemData ={
            itemName,
            itemCode,
            itemType,
            sku,
            quantity,
            price,
        }
        let items = await ItemDal.updateItem(id,itemData);
        const result = new ItemResult(200, 'Item Update Successfully', { items });
        return result;
    }
}

export const Controller = new itemsController();
