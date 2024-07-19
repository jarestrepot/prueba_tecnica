"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        var _a;
        this.app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3001';
        this.midlewares();
    }
    /**
     * Instance singelton
     */
    static get instance() {
        var _a;
        return (_a = this.instaceServer) !== null && _a !== void 0 ? _a : (this.instaceServer = new Server());
    }
    /**
     * Midlewares for the server
     */
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.disable('x-powered-by');
    }
    /**
     * Initialize the server
     */
    start() {
        this.app.listen(this.port, () => {
            console.log(`Listening server on port http://localhost:${this.port}`);
        });
    }
    routes(router, path) {
        this.app.use(path, router);
    }
}
exports.default = Server;
