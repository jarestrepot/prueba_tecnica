"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routerUser = (0, express_1.Router)();
routerUser.get('/', (_req, res) => {
    console.log(process.env.PORT);
    return res.status(200).json({ msg: 'Hello word' });
});
exports.default = routerUser;
