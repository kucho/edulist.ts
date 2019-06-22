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

    public order() {
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

export { Punto };
