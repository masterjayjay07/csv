import { AppError } from "../../erros/AppErros";
import { ICsvCreate } from "../../interfaces";

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('banco.sqlite');

const csvCreateService = async (file: ICsvCreate[]) => {
    const validColumnNames = ['name', 'city', 'country', 'favorite_sport'];
    const validData = file.filter((f) => {
        const keys = Object.keys(f);
        for (const key of keys) {
            if (!validColumnNames.includes(key)) {
                throw new AppError(500, `Invalid column name: ${key}`);
            }
        }
        return true;
    });

    if (validData.length === 0) {
        throw new AppError(500, 'Invalid data');
    }

    return new Promise((resolve, reject) => {
        db.serialize(function () {
            try {
                db.run('DELETE FROM csv');
                db.run(
                    'CREATE TABLE IF NOT EXISTS csv (id INTEGER PRIMARY KEY, name TEXT, city TEXT, country TEXT, favorite_sport TEXT)'
                );

                const insert = db.prepare(
                    'INSERT INTO csv (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)'
                );

                file.forEach((item) => {
                    insert.run(
                        item.name,
                        item.city,
                        item.country,
                        item.favorite_sport
                    );
                });

                insert.finalize();

                db.all('SELECT * FROM csv', (err: any, rows: ICsvCreate[]) => {
                    if (err) {
                        return reject('Failed to retrieve data.');
                    } else {
                        return resolve(rows);
                    }
                });
            } catch (err) {
                reject((err as Error).message);
            }
        });
    });
};

export default csvCreateService;