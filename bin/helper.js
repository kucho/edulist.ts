"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exitEduList(msg) {
    global.console.log(msg);
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", process.exit.bind(process, 0));
}
exports.exitEduList = exitEduList;
