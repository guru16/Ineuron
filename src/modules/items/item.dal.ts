import {Items} from "./item.model";
import { Types } from "mongoose";

class ItemDal {
    async createItem(itemData:any){
        const item = await Items.create(itemData);
        return item;
    }

    async getItems(){
        const items = await Items.find();
        return items;
    }
    async deleteItem(_id: string){
            const item = await Items.findOneAndDelete({ _id: new Types.ObjectId(_id) });
            return item;
    }
    async updateItem(id:string, itemData:any){
        console.log(id,itemData)
        let result = await Items.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set:itemData  })
        console.log(result)
        return result
    }
}


export const Dal = new ItemDal(); 

