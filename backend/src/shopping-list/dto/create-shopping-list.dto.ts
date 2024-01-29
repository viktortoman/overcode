import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateShoppingListDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsNumber()
    readonly price: number;

    @IsBoolean()
    @IsOptional()
    readonly completed: boolean;
}