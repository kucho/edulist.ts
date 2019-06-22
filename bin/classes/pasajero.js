"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pasajero {
    constructor(nombres, apellidos, edad, sexo, nacionalidad, documento, origen, destino, comprobante, monto) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        const pNombre = nombres.split(" ")[0];
        let pApellido = apellidos.split(" ")[0];
        if (pApellido.length <= 3) {
            pApellido = apellidos.split(" ")[0] + " " + apellidos.split(" ")[1];
        }
        this.nombrecorto = pApellido + " " + pNombre;
        this.edad = edad;
        this.sexo = sexo;
        this.nacionalidad = nacionalidad;
        this.documento = documento;
        this.origen = origen;
        this.destino = destino;
        this.comprobante = comprobante;
        this.monto = monto;
    }
}
exports.Pasajero = Pasajero;
