"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const xlsx_1 = __importDefault(require("xlsx"));
const pasajero_1 = require("./classes/pasajero");
function readList(filepath, rutaList, naveList) {
    const realpath = path_1.default.resolve(__dirname, filepath);
    const workbook = xlsx_1.default.readFile(realpath);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    /* Ubicamos las celdas */
    const posRuta = "C1";
    const posTrayecto = "E1";
    const posFecha = "G1";
    const posNave = "I1";
    const posPlaca = "K1";
    /* Populamos los valores de la configuraciòn del viaje */
    const ruta = worksheet[posRuta].v.cleanSpaces();
    const trayecto = worksheet[posTrayecto].v.cleanSpaces();
    const fecha = worksheet[posFecha].v.cleanSpaces();
    const nave = worksheet[posNave].v.cleanSpaces();
    const placa = worksheet[posPlaca].v.cleanSpaces();
    const config = { ruta, trayecto, fecha, nave, placa };
    const isRutaValid = checkConfig(rutaList, naveList, config);
    if (isRutaValid === false || isRutaValid === -1) {
        return false;
    }
    const targetRuta = rutaList[isRutaValid];
    const range = xlsx_1.default.utils.decode_range(worksheet["!ref"] || "");
    const nRows = range.e.r - range.s.r;
    for (let i = 2; i < nRows; i++) {
        /* Sacamos los valores que utilizaremos para crear nuestro pasajero */
        const nombres = worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 1 })].v.cleanSpaces();
        const apellidos = worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 2 })].v.cleanSpaces();
        const edad = +worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 3 })].v.cleanSpaces();
        const sexo = worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 4 })].v.cleanSpaces();
        const nacionalidad = worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 5 })].v.cleanSpaces();
        const documento = worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 6 })].v.cleanSpaces();
        const origen = worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 7 })].v.cleanSpaces();
        const destino = worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 8 })].v.cleanSpaces();
        const comprobante = worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 9 })].v.cleanSpaces();
        const monto = +worksheet[xlsx_1.default.utils.encode_cell({ r: i, c: 10 })].v.cleanSpaces().substring(3);
        global.console.log(monto);
        const pasajero = new pasajero_1.Pasajero(nombres, apellidos, edad, sexo, nacionalidad, documento, origen, destino, comprobante, monto);
        const iPuntoOrigen = targetRuta.puntos.findIndex((p) => p.nombre.toTitle() === origen.toTitle());
        const iPuntoDestino = targetRuta.puntos.findIndex((p) => p.nombre.toTitle() === destino.toTitle());
        global.console.log(`Origen: ${origen.toTitle()} - Destino: ${origen.toTitle()}`);
        global.console.log(`iPuntoOrigen: ${iPuntoOrigen} - iPuntoDestino: ${iPuntoDestino}`);
        if (iPuntoOrigen > -1 && iPuntoDestino > -1) {
            targetRuta.puntos[iPuntoOrigen].suben.push(pasajero);
            targetRuta.puntos[iPuntoDestino].bajan.push(pasajero);
        }
    }
    global.console.log(targetRuta.puntos[5].suben);
}
exports.readList = readList;
function checkConfig(rutaList, naveList, config) {
    /* Comprobamos que la ruta esté definida en la configuración*/
    const isRutaValid = rutaList.findIndex((r) => (r.nombre.toUpperCase() === config.ruta.toUpperCase()));
    if (isRutaValid === -1) {
        global.console.log(`[✗] La ${config.ruta} no está configurada... ERROR`);
        return false;
    }
    else {
        global.console.log(`[✓] La ${config.ruta} está configurada... OK`);
    }
    /* Comprobamos que la nave tenga configuración establecida  */
    const naveExist = naveList.find((rapido) => rapido.nombre === config.nave);
    if (naveExist === undefined) {
        global.console.log(`[✗] La nave ${config.nave} no está configurada... ERROR`);
        return false;
    }
    else {
        global.console.log(`[✓] La nave ${config.nave} está configurada... OK`);
    }
    /* Comprobamos la fecha y mandamos una advertencia si está mal */
    const d = new Date(config.fecha);
    if (d.isValid() === false) {
        global.console.log("[⚠] La fecha no tiene un formato válido... ADVERTENCIA");
    }
    else {
        global.console.log("[✓] La fecha es válida... OK");
    }
    /* Comprobamos que el trayecto sea válido */
    if (config.trayecto.toUpperCase() === "BAJADA" || config.trayecto.toUpperCase() === "SURCADA") {
        global.console.log("[✓] El trayecto es válido... OK");
    }
    else {
        global.console.log(`[✗] El trayecto "${config.trayecto}" no es válido... ERROR`);
        return false;
    }
    /* Comprobamos si la placa está vacía */
    if (config.placa === "") {
        global.console.log("[⚠] El campo placa está vacío... ADVERTENCIA");
    }
    else {
        global.console.log(`[✓] La placa no está vacía... OK`);
    }
    return isRutaValid;
}
