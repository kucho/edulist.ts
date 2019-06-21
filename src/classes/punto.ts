import { Pasajero } from "./pasajero";

class Punto {
    public nombre: string;
    public suben: Pasajero[];
    public bajan: Pasajero[];

    constructor(nombre: string, suben: Pasajero[], bajan: Pasajero[]) {
        this.nombre = nombre;
        this.suben = suben;
        this.bajan = bajan;
    }
}

export { Punto };
