//@ts-nocheck
import { Request, Response } from 'express';
import { CsvController } from './csvController';
import { AppError } from '../../erros/AppErros';
import csvCreateService from '../../services/csv/csvCreateService';
import csvGetService from '../../services/csv/csvGetService';

jest.mock('../../services/csv/csvCreateService');
jest.mock('../../services/csv/csvGetService');

describe('CsvController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let csvController: CsvController;

    beforeEach(() => {
        csvController = new CsvController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        };
    });

    it('should upload a CSV file', async () => {
        const fileData = [
            {
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favorite_sport: 'Basketball',
            },
        ];

        mockRequest.body = fileData;
        csvCreateService.mockResolvedValue(fileData);

        await csvController.csvCreateController(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'The file was uploaded successfully.' });
    });

    it('should handle invalid upload data', async () => {
        const invalidData = [
            {
                nameeee: 'John Doe',
                city: 'New York',
                country: 'USA',
                favorite_sport: 'Basketball',
            },
        ];

        mockRequest.body = invalidData;
        csvCreateService.mockRejectedValue(new AppError(500, 'Invalid data'));

        await csvController.csvCreateController(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Invalid data",
            status: "error",
            statusCode: 500,
        });
    });

    it('should get data with a valid query', async () => {
        const query = 'John';
        const expectedData = [
            {
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favorite_sport: 'Basketball',
            },
        ];

        mockRequest.query = { q: query };
        csvGetService.mockResolvedValue(expectedData);

        await csvController.csvGetController(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(expectedData);
    });

    it('should handle an error during data retrieval', async () => {
        const query = 'John';
        const errorMessage = 'Failed to retrieve data';

        mockRequest.query = { q: query };
        csvGetService.mockRejectedValue(new AppError(500, errorMessage));

        await csvController.csvGetController(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Failed to retrieve data",
            status: "error",
            statusCode: 500,
        });
    });
});
