"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('banco.sqlite');
const csvGetService = (q) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db.serialize(function () {
            if (!q) {
                return db.all('SELECT * FROM csv', (err, data) => {
                    if (err) {
                        reject('Failed to retrieve data.');
                    }
                    else {
                        resolve(data);
                    }
                });
            }
            const sql = `
        SELECT *
        FROM csv
        WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?
      `;
            const searchTerm = `%${q}%`;
            db.all(sql, [searchTerm, searchTerm, searchTerm, searchTerm], (err, data) => {
                if (err) {
                    return reject('Failed to retrieve data.');
                }
                return resolve(data);
            });
        });
    });
});
exports.default = csvGetService;
