#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const config_1 = require("./config");
require("./extenders");
const helper_1 = require("./helper");
const reader_1 = require("./reader");
const wr = __importStar(require("./writer"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("Ingrese los nombres de los archivos a procesar: ", (answer) => {
    const names = answer.cleanSpaces().split(" ");
    for (const name of names) {
        const data = reader_1.readList(name, config_1.rutas, config_1.naves);
        if (data !== false) {
            wr.writeEduList(data.targetRuta, data.config, config_1.naves);
        }
    }
    rl.close();
    helper_1.exitEduList("[RESULTADO]");
});
