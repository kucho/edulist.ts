#!/usr/bin/env node
import readline from "readline";
import { naves, rutas } from "./config";
import "./extenders";
import { exitEduList } from "./helper";
import { readList } from "./reader";
import * as wr from "./writer";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Ingrese los nombres de los archivos a procesar: ", (answer) => {

    const names = answer.cleanSpaces().split(" ");
    for (const name of names) {
        const data = readList(name, rutas, naves);
        if (data !== false) {
            wr.writeEduList(data.targetRuta, data.config, naves);
        }
    }
    rl.close();
    exitEduList("[RESULTADO]");
});
