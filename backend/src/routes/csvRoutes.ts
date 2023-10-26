import { Router } from "express";
import { CsvController } from "../controllers/csv/csvController";

const csvRouter = Router();
const controller = new CsvController()

csvRouter.get('/users', controller.csvGetController)

csvRouter.post('/files', controller.csvCreateController)

export default csvRouter