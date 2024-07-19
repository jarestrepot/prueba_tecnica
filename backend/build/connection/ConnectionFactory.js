"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConectionFactory = void 0;
const constantes_1 = require("../global/constantes");
const connectionMongoDb_1 = __importDefault(require("./class/connectionMongoDb"));
const connectionMysql_1 = __importDefault(require("./class/connectionMysql"));
const connectionPostgreSQL_1 = __importDefault(require("./class/connectionPostgreSQL"));
const connectionSqlite_1 = __importDefault(require("./class/connectionSqlite"));
class ConectionFactory {
    static getConection(connection) {
        if (!connection)
            return null;
        if (connection === constantes_1.ConectionData.MYSQL)
            return new connectionMysql_1.default();
        if (connection === constantes_1.ConectionData.MONGO)
            return new connectionMongoDb_1.default();
        if (connection === constantes_1.ConectionData.POSTGRADED)
            return new connectionPostgreSQL_1.default();
        if (connection === constantes_1.ConectionData.SQLITE)
            return new connectionSqlite_1.default();
        return null;
    }
}
exports.ConectionFactory = ConectionFactory;
