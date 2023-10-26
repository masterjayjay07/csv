"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const csvRoutes_1 = __importDefault(require("./csvRoutes"));
const routes = (0, express_1.Router)();
routes.use('/', csvRoutes_1.default);
exports.default = routes;
