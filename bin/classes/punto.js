"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Punto {
    constructor(nombre, suben, bajan) {
        this.nombre = nombre;
        this.suben = suben;
        this.bajan = bajan;
    }
    order() {
        this.suben.sort((a, b) => {
            if (a.apellidos < b.apellidos) {
                return -1;
            }
            if (a.nombres > b.nombres) {
                return 1;
            }
            return 0;
        });
        this.bajan.sort((a, b) => {
            if (a.apellidos < b.apellidos) {
                return -1;
            }
            if (a.nombres > b.nombres) {
                return 1;
            }
            return 0;
        });
    }
}
exports.Punto = Punto;
