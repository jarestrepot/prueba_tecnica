"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class POSTGREConnection {
    constructor() {
    }
    conectar() {
        console.log("Connection PostgreSQL");
        return true;
    }
    disconnect() {
        console.log("Disconnection PostgreSQL");
        return true;
    }
}
exports.default = POSTGREConnection;
