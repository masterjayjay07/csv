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
const AppErros_1 = require("../../erros/AppErros");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('banco.sqlite');
const csvCreateService = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const validColumnNames = ['name', 'city', 'country', 'favorite_sport'];
    const validData = file.filter((f) => {
        const keys = Object.keys(f);
        for (const key of keys) {
            if (!validColumnNames.includes(key)) {
                throw new AppErros_1.AppError(500, `Invalid column name: ${key}`);
            }
        }
        return true;
    });
    if (validData.length === 0) {
        throw new AppErros_1.AppError(500, 'Invalid data');
    }
    return new Promise((resolve, reject) => {
        db.serialize(function () {
            try {
                db.run('DELETE FROM csv');
                db.run('CREATE TABLE IF NOT EXISTS csv (id INTEGER PRIMARY KEY, name TEXT, city TEXT, country TEXT, favorite_sport TEXT)');
                const insert = db.prepare('INSERT INTO csv (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)');
                file.forEach((item) => {
                    insert.run(item.name, item.city, item.country, item.favorite_sport);
                });
                insert.finalize();
                db.all('SELECT * FROM csv', (err, rows) => {
                    if (err) {
                        return reject('Failed to retrieve data.');
                    }
                    else {
                        return resolve(rows);
                    }
                });
            }
            catch (err) {
                reject(err.message);
            }
        });
    });
});
exports.default = csvCreateService;
