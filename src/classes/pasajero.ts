class Pasajero {
    public nombres: string;
    public apellidos: string;
    public edad: number;
    public sexo: string;
    public nacionalidad: string;
    public documento: string;
    public origen: string;
    public destino: string;
    public comprobante: string;
    public monto: number;

    constructor(
        nombres: string, apellidos: string, edad: number, sexo: string, nacionalidad: string,
        documento: string, origen: string, destino: string, comprobante: string, monto: number) {

        this.nombres = nombres;
        this.apellidos = apellidos;
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

export { Pasajero };
