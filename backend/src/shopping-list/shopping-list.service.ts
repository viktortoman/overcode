import { Injectable } from '@nestjs/common';
import mongoose, {Model} from "mongoose";
import {ShoppingList} from "./interfaces/shopping-list.interface";
import {InjectModel} from "@nestjs/mongoose";
import {CreateShoppingListDto} from "./dto/create-shopping-list.dto";
import {UpdateShoppingListDto} from "./dto/update-shopping-list.dto.ts";

@Injectable()
export class ShoppingListService {
    constructor(
        @InjectModel('ShoppingList') private shoppingListModel: Model<ShoppingList>
    ) {}

    async getAllShoppingLists(): Promise<ShoppingList[]> {
        return await this.shoppingListModel.find().exec();
    }

    async getShoppingListById(id: string): Promise<ShoppingList> {
        return await this.shoppingListModel.findById(id);
    }

    async addShoppingList(createShoppingListDTO: CreateShoppingListDto): Promise<ShoppingList> {
        const newShoppingList = new this.shoppingListModel(createShoppingListDTO);
        return await newShoppingList.save();
    }

    async updateShoppingList(id: string, updateShoppingListDto: UpdateShoppingListDto): Promise<ShoppingList> {
        const updatedShoppingList = await this.shoppingListModel
            .findByIdAndUpdate(id, updateShoppingListDto, { new: true });
        return updatedShoppingList;
    }

    async deleteShoppingList(id: string): Promise<any> {
        const deletedShoppingList = await this.shoppingListModel.findByIdAndDelete(id);
        return deletedShoppingList;
    }
}
