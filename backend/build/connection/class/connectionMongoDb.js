"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MONGOConnection {
    constructor() { }
    conectar() {
        console.log('Connection Mongo db');
        return true;
    }
    disconnect() {
        console.log('Disconnect mongo db');
        return true;
    }
}
exports.default = MONGOConnection;
