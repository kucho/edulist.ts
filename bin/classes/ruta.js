"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ruta {
    constructor(nombre, puntos) {
        this.nombre = nombre;
        this.puntos = puntos;
    }
    revertir() {
        this.puntos.reverse();
    }
}
exports.Ruta = Ruta;
