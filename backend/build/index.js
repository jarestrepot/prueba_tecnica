"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./models/Server"));
const user_1 = __importDefault(require("./router/user"));
const server = Server_1.default.instance;
server.start();
server.routes(user_1.default, '/user');
