import { Punto } from "../classes/punto";

class Ruta {
    public nombre: string;
    public puntos: Punto[];

    constructor(nombre: string, puntos: Punto[]) {
        this.nombre = nombre;
        this.puntos = puntos;
    }

    public revertir() {
        this.puntos.reverse();
    }
}

export { Ruta };
