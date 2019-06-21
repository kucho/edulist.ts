#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const config_1 = require("./config");
require("./extenders");
const reader_1 = require("./reader");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("Ingrese los nombres de los archivos a procesar: ", (answer) => {
    const names = answer.cleanSpaces().split(" ");
    for (const name of names) {
        reader_1.readList("../" + name + ".xlsx", config_1.rutas, config_1.naves);
    }
    rl.close();
});
