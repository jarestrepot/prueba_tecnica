"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTES = exports.ConectionData = void 0;
var ConectionData;
(function (ConectionData) {
    ConectionData["MYSQL"] = "MYSQL";
    ConectionData["MONGO"] = "MONGO";
    ConectionData["SQLITE"] = "SQLITE";
    ConectionData["POSTGRADED"] = "POSTGRADE";
})(ConectionData || (exports.ConectionData = ConectionData = {}));
exports.CONSTANTES = {
    conections: ConectionData
};
Object.freeze(exports.CONSTANTES);
