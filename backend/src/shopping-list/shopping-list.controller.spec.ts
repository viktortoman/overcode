import {Test, TestingModule} from '@nestjs/testing';
import {ShoppingListController} from './shopping-list.controller';
import {ShoppingListService} from "./shopping-list.service";
import {getModelToken} from "@nestjs/mongoose";
import {HttpStatus} from "@nestjs/common";
import {CreateShoppingListDto} from "./dto/create-shopping-list.dto";

describe('ShoppingListController', () => {
    let controller: ShoppingListController;
    let service: ShoppingListService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ShoppingListService, {
                provide: getModelToken('ShoppingList'),
                useValue: jest.fn()
            }],
            controllers: [ShoppingListController],
        }).compile();

        controller = module.get<ShoppingListController>(ShoppingListController);
        service = module.get<ShoppingListService>(ShoppingListService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });


    describe('getAllShoppingLists', () => {
        it('should return all shopping lists on success', async () => {
            const mockShoppingLists = [];
            jest.spyOn(service, 'getAllShoppingLists').mockResolvedValue(mockShoppingLists);

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await controller.getAllShoppingLists(res as any);

            expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(res.json).toHaveBeenCalledWith({ data: mockShoppingLists });
        });

        it('should return error response on exception', async () => {
            jest.spyOn(service, 'getAllShoppingLists').mockRejectedValue(new Error('Some error message'));

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await controller.getAllShoppingLists(res as any);

            expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Bevásárló lista elem nem található',
            });
        });
    });

    describe('addShoppingList', () => {
        jest.mock('./shopping-list.service', () => ({
            ShoppingListService: jest.fn().mockImplementation(() => ({
                addShoppingList: jest.fn(),
            })),
        }));

        it('should return error response on exception', async () => {
            // Arrange
            const mockCreateShoppingListDto: CreateShoppingListDto = new CreateShoppingListDto();
            jest.spyOn(service, 'addShoppingList').mockRejectedValue(new Error('Some error message'));

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Act
            await controller.addShoppingList(res as any, mockCreateShoppingListDto);

            // Assert
            expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Hiba: Bevásárló lista elem nem hozható létre',
            });
        });
    });

    describe('deleteShoppingList', () => {
        it('should return error response on exception', async () => {
            // Arrange
            const mockId = 'mockId';
            jest.spyOn(service, 'deleteShoppingList').mockRejectedValue(new Error('Some error message'));

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Act
            await controller.deleteShoppingList(res as any, mockId);

            // Assert
            expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Hiba: Bevásárló lista elem nem törölhető',
            });
        });
    });
});
