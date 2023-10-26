//@ts-nocheck
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('banco.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS csv (
      id INTEGER PRIMARY KEY,
      name TEXT,
      city TEXT,
      country TEXT,
      favorite_sport TEXT
    )
  `);
});

db.close((err) => {
  if (err) {
    console.error('Erro ao fechar o banco de dados:', err.message);
  } else {
    console.log('Banco de dados foi fechado.');
  }
});