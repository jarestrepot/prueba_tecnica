"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SQLiteConnection {
    constructor() { }
    conectar() {
        console.log('Connection SqLite');
        return true;
    }
    disconnect() {
        console.log('Disconnection SqLite');
        return true;
    }
}
exports.default = SQLiteConnection;
