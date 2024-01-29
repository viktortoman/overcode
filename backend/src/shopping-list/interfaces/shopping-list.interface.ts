import { Document } from 'mongoose';

export interface ShoppingList extends Document {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly completed: boolean;
}