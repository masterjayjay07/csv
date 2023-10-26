//@ts-nocheck
import { Request, Response } from "express";
import "express-async-errors";
import { AppError, handleError } from "../../erros/AppErros";

import csvCreateService from "../../services/csv/csvCreateService";
import csvGetService from "../../services/csv/csvGetService";

export class CsvController {
    csvCreateController = async (req: Request, res: Response) => {
        try {
            const file = req.body;
            await csvCreateService(file);
            return res.status(200).json({ message: "The file was uploaded successfully." });
        } catch (err) {
            if (err instanceof AppError) {
                handleError(err, res);
            }
        }
    }


    csvGetController = async (req: Request, res: Response) => {
        try {
            const { q } = req.query;
            const data = await csvGetService(q);
            return res.status(200).json(data);
        } catch (err) {
            if (err instanceof AppError) {
                handleError(err, res);
            } else {
                handleError(new AppError(500, err.message), res);
            }
        }
    };
}