import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {ShoppingListService} from "./shopping-list.service";
import {CreateShoppingListDto} from "./dto/create-shopping-list.dto";
import {UpdateShoppingListDto} from "./dto/update-shopping-list.dto.ts";

@Controller('shopping-list')
export class ShoppingListController {

    constructor(
        private readonly shoppingListService: ShoppingListService
    ) {}

    @Get('/')
    async getAllShoppingLists(@Res() res: any) {
        try {
            const shoppingLists = await this.shoppingListService.getAllShoppingLists();
            return res.status(HttpStatus.OK).json({
                data: shoppingLists,
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Bevásárló lista elem nem található",
            });
        }
    }

    @Post('/')
    @UsePipes(new ValidationPipe({transform: true}))
    async addShoppingList(@Res() res: any, @Body() createShoppingListDTO: CreateShoppingListDto) {
        try {
            const shoppingList = await this.shoppingListService.addShoppingList(createShoppingListDTO);
            return res.status(HttpStatus.CREATED).json({
                message: "Bevásárló lista elem sikeresen létrehozva",
                data: shoppingList,
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Hiba: Bevásárló lista elem nem hozható létre",
            });
        }
    }

    @Get('/:id')
    async getShoppingListById(@Res() res: any, @Param('id') id: string) {
        try {
            const shoppingList = await this.shoppingListService.getShoppingListById(id);

            if (!shoppingList) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "Bevásárló lista elem nem található",
                });
            }

            return res.status(HttpStatus.OK).json({
                data: shoppingList,
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Hiba: Bevásárló lista elem nem található",
            });
        }
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe({transform: true}))
    async updateShoppingList(@Res() res: any, @Param('id') id: string, @Body() updateShoppingListDto: UpdateShoppingListDto) {
        try {
            const shoppingList = await this.shoppingListService.updateShoppingList(id, updateShoppingListDto);

            if (!shoppingList) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "Shopping List not found",
                });
            }

            return res.status(HttpStatus.OK).json({
                message: "Bevásárló lista elem sikeresen frissítve",
                data: shoppingList,
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Hiba: Bevásárló lista elem nem frissíthető",
            });
        }
    }

    @Delete('/:id')
    async deleteShoppingList(@Res() res: any, @Param('id') id: string) {
        try {
            const shoppingList = await this.shoppingListService.deleteShoppingList(id);

            if (!shoppingList) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "Shopping List not found",
                });
            }

            return res.status(HttpStatus.OK).json({
                message: "Bevásárló lisat elem sikeresen törölve",
                data: shoppingList,
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Hiba: Bevásárló lista elem nem törölhető",
            });
        }
    }
}
