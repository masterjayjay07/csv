"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const csvController_1 = require("../controllers/csv/csvController");
const csvRouter = (0, express_1.Router)();
const controller = new csvController_1.CsvController();
csvRouter.get('/users', controller.csvGetController);
csvRouter.post('/files', controller.csvCreateController);
exports.default = csvRouter;
