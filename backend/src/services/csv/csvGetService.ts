import { ICsvCreate, IUserSearch } from "../../interfaces";
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('banco.sqlite');

const csvGetService = async (q: IUserSearch) => {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      if (!q) {
        return db.all('SELECT * FROM csv', (err: any, data: ICsvCreate[]) => {
          if (err) {
            reject('Failed to retrieve data.');
          } else {
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
      db.all(sql, [searchTerm, searchTerm, searchTerm, searchTerm], (err: any, data: ICsvCreate[]) => {
        if (err) {
          return reject('Failed to retrieve data.');
        }
        return resolve(data);
      });
    });
  });
}

export default csvGetService;
