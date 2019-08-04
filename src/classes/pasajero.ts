class Pasajero {
    public nombres: string;
    public apellidos: string;
    public nombrecorto: string;
    public edad: number;
    public sexo: string;
    public nacionalidad: string;
    public documento: string;
    public origen: string;
    public destino: string;
    public comprobante: string;
    public monto: number;
    public asiento:string;

    constructor(
        nombres: string, apellidos: string, edad: number, sexo: string, nacionalidad: string,
        documento: string, origen: string, destino: string, comprobante: string, monto: number, asiento: string) {

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
        this.asiento=asiento;
    }
}

export { Pasajero };
