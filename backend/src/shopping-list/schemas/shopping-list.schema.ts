import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {IsBoolean, IsNumber, IsOptional} from "class-validator";

@Schema()
export class ShoppingList {
    @Prop({required: true})
    name: string;

    @Prop()
    @IsOptional()
    description: string;

    @Prop({required: true})
    @IsNumber()
    price: number;

    @Prop({default: false})
    @IsOptional()
    @IsBoolean()
    completed: boolean;
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);