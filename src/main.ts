#!/usr/bin/env node
import readline from "readline";
import { naves, rutas } from "./config";
import "./extenders";
import { readList } from "./reader";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Ingrese los nombres de los archivos a procesar: ", (answer) => {

    const names = answer.cleanSpaces().split(" ");
    for (const name of names) {
        readList("../" + name + ".xlsx", rutas, naves);
    }

    rl.close();
});
