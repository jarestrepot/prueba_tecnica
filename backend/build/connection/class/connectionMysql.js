"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MYSQLConnection {
    constructor() {
        var _a, _b, _c, _d;
        this.db = (_a = process.env.MYSQL_DB) !== null && _a !== void 0 ? _a : '';
        this.root = (_b = process.env.MYSQL_ROOT) !== null && _b !== void 0 ? _b : 'root';
        this.password = (_c = process.env.MYSQL_PASSWORD) !== null && _c !== void 0 ? _c : '';
        this.host = (_d = process.env.MYSQL_HOST) !== null && _d !== void 0 ? _d : 'localhost';
    }
    conectar() {
        console.log('Connection MySQL');
        return true;
    }
    disconnect() {
        console.log('Disconnection MySQL');
        return true;
    }
}
exports.default = MYSQLConnection;
