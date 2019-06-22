import fs from "fs";
import path from "path";
import XLSX from "xlsx";
import { Nave } from "./classes/nave";
import { Pasajero } from "./classes/pasajero";
import { Ruta } from "./classes/ruta";

function readList(filepath: string, rutaList: Ruta[], naveList: Nave[]) {

    const realpath = path.join(path.dirname(process.execPath), "./" + filepath + ".xlsx");

    const exists = fs.existsSync(realpath);
    if (exists === true) {
        global.console.log(`[✓] Lista "${filepath}.xlsx" encontrada... OK`);
    } else {
        global.console.log(`[✗] La lista "${filepath}.xlsx" no fue encontrada... ERROR`);
        return false;
    }

    const workbook = XLSX.readFile(realpath);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    /* Ubicamos las celdas */
    const posRuta: string = "C1";
    const posTrayecto: string = "E1";
    const posFecha: string = "G1";
    const posNave: string = "I1";
    const posPlaca: string = "K1";

    /* Populamos los valores de la configuraciòn del viaje */
    const ruta: string = worksheet[posRuta].v.cleanSpaces().toTitle();
    const trayecto: string = worksheet[posTrayecto].v.cleanSpaces().toTitle();
    const fecha: string = worksheet[posFecha].v.cleanSpaces();
    const nave: string = worksheet[posNave].v.cleanSpaces();
    const placa: string = worksheet[posPlaca].v.cleanSpaces();

    const config = { ruta, trayecto, fecha, nave, placa };

    const isRutaValid = checkConfig(rutaList, naveList, config);

    if (isRutaValid === -1) { return false; }
    const targetRuta = rutaList[isRutaValid];

    const range = XLSX.utils.decode_range(worksheet["!ref"] || "");
    const nRows = range.e.r - range.s.r + 1;

    for (let i = 2; i < nRows; i++) {

        /* Sacamos los valores que utilizaremos para crear nuestro pasajero */
        const nombres = worksheet[XLSX.utils.encode_cell({ r: i, c: 1 })].v.cleanSpaces().toTitle();
        const apellidos = worksheet[XLSX.utils.encode_cell({ r: i, c: 2 })].v.cleanSpaces().toTitle();
        const edad = +worksheet[XLSX.utils.encode_cell({ r: i, c: 3 })].v.cleanSpaces();
        const sexo = worksheet[XLSX.utils.encode_cell({ r: i, c: 4 })].v.cleanSpaces();
        const nacionalidad = worksheet[XLSX.utils.encode_cell({ r: i, c: 5 })].v.cleanSpaces();
        const documento = worksheet[XLSX.utils.encode_cell({ r: i, c: 6 })].v.cleanSpaces();
        const origen = worksheet[XLSX.utils.encode_cell({ r: i, c: 7 })].v.cleanSpaces();
        const destino = worksheet[XLSX.utils.encode_cell({ r: i, c: 8 })].v.cleanSpaces();
        const comprobante = worksheet[XLSX.utils.encode_cell({ r: i, c: 9 })].v.cleanSpaces();
        const monto = +worksheet[XLSX.utils.encode_cell({ r: i, c: 10 })].v.cleanSpaces().substring(3);

        const pasajero = new Pasajero(nombres, apellidos, edad, sexo, nacionalidad,
            documento, origen, destino, comprobante, monto);

        const iPuntoOrigen = targetRuta.puntos.findIndex((p) => p.nombre.toTitle() === origen.toTitle());
        const iPuntoDestino = targetRuta.puntos.findIndex((p) => p.nombre.toTitle() === destino.toTitle());

        if (iPuntoOrigen > -1 && iPuntoDestino > -1) {
            targetRuta.puntos[iPuntoOrigen].suben.push(pasajero);
            targetRuta.puntos[iPuntoDestino].bajan.push(pasajero);
        }
    }

    if (trayecto.toUpperCase() === "SURCADA") {
        targetRuta.revertir();
    }

    for (const p of targetRuta.puntos) {
        p.order();
    }

    return { targetRuta, config };
}

function checkConfig(
    rutaList: Ruta[], naveList: Nave[],
    config: { ruta: string, nave: string, fecha: string, trayecto: string, placa: string }): number {

    /* Comprobamos que la ruta esté definida en la configuración*/
    const isRutaValid = rutaList.findIndex((r) => (r.nombre.toUpperCase() === config.ruta.toUpperCase()));

    if (isRutaValid === -1) {
        global.console.log(`[✗] La ${config.ruta.toTitle()} no está configurada... ERROR`);
        return isRutaValid;
    } else {
        global.console.log(`[✓] La ${config.ruta.toTitle()} está configurada... OK`);
    }

    /* Comprobamos que la nave tenga configuración establecida  */
    const naveExist = naveList.find((rapido) => rapido.nombre === config.nave);
    if (naveExist === undefined) {
        global.console.log(`[✗] La nave ${config.nave} no está configurada... ERROR`);
        return isRutaValid;
    } else {
        global.console.log(`[✓] La nave ${config.nave} está configurada... OK`);
    }

    /* Comprobamos la fecha y mandamos una advertencia si está mal */
    const d = new Date(config.fecha);

    if (d.isValid() === false) {
        global.console.log("[⚠ ] La fecha no tiene un formato válido... ADVERTENCIA");
    } else { global.console.log("[✓] La fecha es válida... OK"); }

    /* Comprobamos que el trayecto sea válido */
    if (config.trayecto.toUpperCase() === "BAJADA" || config.trayecto.toUpperCase() === "SURCADA") {
        global.console.log("[✓] El trayecto es válido... OK");
    } else {
        global.console.log(`[✗] El trayecto "${config.trayecto}" no es válido... ERROR`);
        return isRutaValid;
    }

    /* Comprobamos si la placa está vacía */
    if (config.placa === "") {
        global.console.log("[⚠ ] El campo placa está vacía... ADVERTENCIA");
    } else { global.console.log(`[✓] La placa no está vacía... OK`); }

    return isRutaValid;
}

export { readList };
