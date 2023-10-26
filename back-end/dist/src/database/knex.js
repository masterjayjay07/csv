"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const knexConfig = {
    production: {
        client: 'pg',
        debug: true,
        connection: {
            host: process.env.DATABASE_URL || 'localhost',
            port: process.env.DATABASE_PORT || 5432,
            database: process.env.DATABASE_NAME || 'database_name',
            user: process.env.DATABASE_USER || 'database_user',
            password: process.env.DATABASE_PASSWORD || 'database_password',
            ssl: { rejectUnauthorized: false }
        }
    },
};
const config = knexConfig["production"];
const db = (0, knex_1.default)(config);
db.raw('SELECT 1')
    .then(() => console.log('Conexão bem sucedida!'))
    .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
    process.exit(1);
});
exports.default = db;
