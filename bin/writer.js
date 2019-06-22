"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = __importDefault(require("exceljs"));
const fs_1 = __importDefault(require("fs"));
function writeEduList(data, config, naveList) {
    const wb = new exceljs_1.default.Workbook();
    let filename = `Lista ${config.nave} - ${config.fecha} - ${config.trayecto}`;
    writeSupList(wb, data, config);
    writeCapList(wb, data, config, naveList);
    filename = checkFileName(filename);
    wb.xlsx.writeFile(`./${filename}.xlsx`).then(() => {
        global.console.log(`[✓] Se creó la lista ${filename}.xlsx`);
    });
}
exports.writeEduList = writeEduList;
function checkFileName(filename) {
    let c = 1;
    while (true) {
        const exists = fs_1.default.existsSync(`./${filename}.xlsx`);
        if (exists === true) {
            const duplicate = parseInt(filename.substring(filename.length - 2, filename.length - 1), 10);
            if (isNaN(duplicate) === true) {
                filename = filename + ` (${c})`;
                c++;
                checkFileName(filename);
            }
            else {
                const long = filename.length - 4;
                filename = filename.substring(0, long) + ` (${duplicate + 1})`;
                checkFileName(filename);
            }
        }
        else {
            return filename;
            break;
        }
    }
}
function setBorder(ws, width, r, c) {
    for (let i = c; i < c + width; i++) {
        ws.getRow(r).getCell(i).border = {
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
            top: { style: "thin" },
        };
        ws.getRow(r).getCell(i).font = {
            bold: false, size: 11,
        };
    }
}
function writeCapList(wb, data, config, naveList) {
    const wsO = wb.addWorksheet("LISTA - ORIGEN");
    wsO.properties.defaultRowHeight = 22;
    wsO.pageSetup.paperSize = 9;
    wsO.pageSetup.margins = { top: 0.2, left: 0.15, bottom: 0.2, right: 0.15, header: 0, footer: 0 };
    const wsD = wb.addWorksheet("LISTA - DESTINO");
    wsD.properties.defaultRowHeight = 22;
    wsO.pageSetup.paperSize = 9;
    /* Cargamos el logo */
    const logo = wb.addImage({
        buffer: fs_1.default.readFileSync("./assets/logo.png"),
        extension: "png",
    });
    /* Insertamos la imagen en hoja de Origen */
    wsO.addImage(logo, {
        br: { col: 2, row: 2.9 },
        tl: { col: 0.1, row: 0.1 },
    });
    /* Insertamos los datos de la cabecera en la hoja de Origen*/
    setBorder(wsO, 1, 1, 1);
    wsO.mergeCells("A1:B3");
    wsO.getCell("C1").value = `LISTA DE ZARPE - ORIGEN`;
    setBorder(wsO, 1, 1, 3);
    wsO.getCell("C1").font = { size: 14, bold: true };
    wsO.mergeCells("C1:I1");
    wsO.getCell("C2").value = `Embarcación: ${config.nave} | Placa: ${config.placa} | ${config.ruta}`;
    setBorder(wsO, 1, 2, 3);
    wsO.getCell("C2").font = { size: 14, bold: true };
    wsO.mergeCells("C2:I2");
    wsO.getCell("C3").value = `Trayecto: ${config.trayecto} | Fecha: ${config.fecha}`;
    setBorder(wsO, 1, 3, 3);
    wsO.getCell("C3").font = { size: 14, bold: true };
    wsO.mergeCells("C3:I3");
    /* Insertamos la imagen en la hoja de destino*/
    wsD.addImage(logo, {
        br: { col: 2, row: 2.9 },
        tl: { col: 0.1, row: 0.1 },
    });
    /* Insertamos la imagen en hoja de Destino */
    setBorder(wsD, 1, 1, 1);
    wsD.mergeCells("A1:B3");
    wsD.getCell("C1").value = `LISTA DE ZARPE - DESTINO`;
    setBorder(wsD, 1, 1, 3);
    wsD.getCell("C1").font = { size: 14, bold: true };
    wsD.mergeCells("C1:I1");
    wsD.getCell("C2").value = `Embarcación: ${config.nave} | Placa: ${config.placa} | ${config.ruta}`;
    setBorder(wsD, 1, 2, 3);
    wsD.getCell("C2").font = { size: 14, bold: true };
    wsD.mergeCells("C2:I2");
    wsD.getCell("C3").value = `Trayecto: ${config.trayecto} | Fecha: ${config.fecha}`;
    setBorder(wsD, 1, 3, 3);
    wsD.getCell("C3").font = { size: 14, bold: true };
    wsD.mergeCells("C3:I3");
    /* Ponemos el tallarín de la celdas */
    wsO.getColumn("A").width = 3;
    wsO.getColumn("B").width = 22;
    wsO.getColumn("C").width = 18;
    wsO.getColumn("D").width = 5;
    wsO.getColumn("E").width = 5;
    wsO.getColumn("F").width = 12;
    wsO.getColumn("G").width = 12;
    wsO.getColumn("H").width = 12;
    wsO.getColumn("I").width = 12;
    /* Ponemos el tallarín de la celdas */
    wsD.getColumn("A").width = 3;
    wsD.getColumn("B").width = 22;
    wsD.getColumn("C").width = 18;
    wsD.getColumn("D").width = 5;
    wsD.getColumn("E").width = 5;
    wsD.getColumn("F").width = 12;
    wsD.getColumn("G").width = 12;
    wsD.getColumn("H").width = 12;
    wsD.getColumn("I").width = 12;
    /* Alineamos las celdas */
    wsO.getColumn("A").alignment = { vertical: "middle", horizontal: "center" };
    wsO.getColumn("B").alignment = { vertical: "middle", horizontal: "left" };
    wsO.getColumn("C").alignment = { vertical: "middle", horizontal: "left" };
    wsO.getColumn("D").alignment = { vertical: "middle", horizontal: "center" };
    wsO.getColumn("E").alignment = { vertical: "middle", horizontal: "center" };
    wsO.getColumn("F").alignment = { vertical: "middle", horizontal: "center" };
    wsO.getColumn("G").alignment = { vertical: "middle", horizontal: "center" };
    wsO.getColumn("H").alignment = { vertical: "middle", horizontal: "center" };
    wsO.getColumn("I").alignment = { vertical: "middle", horizontal: "center" };
    /* Alineamos las celdas */
    wsD.getColumn("A").alignment = { vertical: "middle", horizontal: "center" };
    wsD.getColumn("B").alignment = { vertical: "middle", horizontal: "left" };
    wsD.getColumn("C").alignment = { vertical: "middle", horizontal: "left" };
    wsD.getColumn("D").alignment = { vertical: "middle", horizontal: "center" };
    wsD.getColumn("E").alignment = { vertical: "middle", horizontal: "center" };
    wsD.getColumn("F").alignment = { vertical: "middle", horizontal: "center" };
    wsD.getColumn("G").alignment = { vertical: "middle", horizontal: "center" };
    wsD.getColumn("H").alignment = { vertical: "middle", horizontal: "center" };
    wsD.getColumn("I").alignment = { vertical: "middle", horizontal: "center" };
    const rHead = 4;
    const cHead = 1;
    /* Cabecera de tabla central de origen */
    setBorder(wsO, 9, 4, 1);
    wsO.getRow(rHead).height = 22;
    wsO.getRow(rHead).getCell(cHead).value = "Nº";
    wsO.getRow(rHead).getCell(cHead + 1).value = "Apellidos";
    wsO.getRow(rHead).getCell(cHead + 1).alignment = { vertical: "middle", horizontal: "center" };
    wsO.getRow(rHead).getCell(cHead + 2).value = "Nombres";
    wsO.getRow(rHead).getCell(cHead + 2).alignment = { vertical: "middle", horizontal: "center" };
    wsO.getRow(rHead).getCell(cHead + 3).value = "Edad";
    wsO.getRow(rHead).getCell(cHead + 4).value = "Sexo";
    wsO.getRow(rHead).getCell(cHead + 5).value = "Documento";
    wsO.getRow(rHead).getCell(cHead + 6).value = "Nacionalidad";
    wsO.getRow(rHead).getCell(cHead + 7).value = "Origen";
    wsO.getRow(rHead).getCell(cHead + 8).value = "Destino";
    wsO.getRow(rHead).getCell(cHead).font = { bold: true, size: 11 };
    wsO.getRow(rHead).getCell(cHead + 1).font = { bold: true, size: 11 };
    wsO.getRow(rHead).getCell(cHead + 2).font = { bold: true, size: 11 };
    wsO.getRow(rHead).getCell(cHead + 3).font = { bold: true, size: 11 };
    wsO.getRow(rHead).getCell(cHead + 4).font = { bold: true, size: 11 };
    wsO.getRow(rHead).getCell(cHead + 5).font = { bold: true, size: 11 };
    wsO.getRow(rHead).getCell(cHead + 6).font = { bold: true, size: 11 };
    wsO.getRow(rHead).getCell(cHead + 7).font = { bold: true, size: 11 };
    wsO.getRow(rHead).getCell(cHead + 8).font = { bold: true, size: 11 };
    /* Cabecera de tabla central de destino */
    setBorder(wsD, 9, 4, 1);
    wsD.getRow(rHead).height = 22;
    wsD.getRow(rHead).getCell(cHead).value = "Nº";
    wsD.getRow(rHead).getCell(cHead + 1).value = "Apellidos";
    wsD.getRow(rHead).getCell(cHead + 1).alignment = { vertical: "middle", horizontal: "center" };
    wsD.getRow(rHead).getCell(cHead + 2).value = "Nombres";
    wsD.getRow(rHead).getCell(cHead + 2).alignment = { vertical: "middle", horizontal: "center" };
    wsD.getRow(rHead).getCell(cHead + 3).value = "Edad";
    wsD.getRow(rHead).getCell(cHead + 4).value = "Sexo";
    wsD.getRow(rHead).getCell(cHead + 5).value = "Documento";
    wsD.getRow(rHead).getCell(cHead + 6).value = "Nacionalidad";
    wsD.getRow(rHead).getCell(cHead + 7).value = "Origen";
    wsD.getRow(rHead).getCell(cHead + 8).value = "Destino";
    wsD.getRow(rHead).getCell(cHead).font = { bold: true, size: 11 };
    wsD.getRow(rHead).getCell(cHead + 1).font = { bold: true, size: 11 };
    wsD.getRow(rHead).getCell(cHead + 2).font = { bold: true, size: 11 };
    wsD.getRow(rHead).getCell(cHead + 3).font = { bold: true, size: 11 };
    wsD.getRow(rHead).getCell(cHead + 4).font = { bold: true, size: 11 };
    wsD.getRow(rHead).getCell(cHead + 5).font = { bold: true, size: 11 };
    wsD.getRow(rHead).getCell(cHead + 6).font = { bold: true, size: 11 };
    wsD.getRow(rHead).getCell(cHead + 7).font = { bold: true, size: 11 };
    wsD.getRow(rHead).getCell(cHead + 8).font = { bold: true, size: 11 };
    const r = 5;
    let cS = 0;
    let cB = 0;
    const c = 1;
    let infantesOrigen = 0;
    let infantesDestino = 0;
    const pInfante = 20;
    let excesoOrigen = 0;
    let excesoDestino = 0;
    /* Capacidad de la nave */
    const nave = naveList.find((ship) => ship.nombre === config.nave);
    for (const p of data.puntos) {
        /* Si están vacíos no hacemos nada */
        if (p.suben.length === 0 && p.bajan.length === 0) {
            continue;
        }
        wsO.getRow(r + cS).height = 22;
        wsD.getRow(r + cS).height = 22;
        for (const s of p.suben) {
            if (s.origen === data.puntos[0].nombre) {
                if (s.edad <= 2 && s.monto <= pInfante) {
                    infantesOrigen++;
                    continue;
                }
                if (nave !== undefined) {
                    if (cS >= nave.capacidad) {
                        excesoOrigen++;
                        continue;
                    }
                }
                setBorder(wsO, 9, r + cS, cHead);
                const rowS = wsO.getRow(r + cS);
                rowS.height = 22;
                rowS.getCell(c).value = cS + 1;
                rowS.getCell(c + 1).value = s.apellidos;
                rowS.getCell(c + 2).value = s.nombres;
                rowS.getCell(c + 3).value = s.edad;
                rowS.getCell(c + 4).value = s.sexo;
                rowS.getCell(c + 5).value = s.documento;
                rowS.getCell(c + 6).value = s.nacionalidad;
                rowS.getCell(c + 7).value = s.origen;
                rowS.getCell(c + 8).value = s.destino;
                cS++;
            }
        }
        for (const b of p.bajan) {
            if (b.destino === data.puntos[data.puntos.length - 1].nombre) {
                if (b.edad <= 2 && b.monto <= pInfante) {
                    infantesDestino++;
                    continue;
                }
                if (nave !== undefined) {
                    if (cB >= nave.capacidad) {
                        excesoDestino++;
                        continue;
                    }
                }
                setBorder(wsD, 9, r + cB, cHead);
                const rowB = wsD.getRow(r + cB);
                rowB.getCell(c).value = cB + 1;
                rowB.getCell(c + 1).value = b.apellidos;
                rowB.getCell(c + 2).value = b.nombres;
                rowB.getCell(c + 3).value = b.edad;
                rowB.getCell(c + 4).value = b.sexo;
                rowB.getCell(c + 5).value = b.documento;
                rowB.getCell(c + 6).value = b.nacionalidad;
                rowB.getCell(c + 7).value = b.origen;
                rowB.getCell(c + 8).value = b.destino;
                cB++;
            }
        }
    }
    if (infantesOrigen > 0) {
        global.console.log(`[⚠ ] Se ocultaron ${infantesOrigen} infantes de la lista de origen... ADVERTENCIA`);
    }
    if (infantesDestino > 0) {
        global.console.log(`[⚠ ] Se ocultaron ${infantesDestino} infantes de la lista de destino... ADVERTENCIA`);
    }
    if (excesoOrigen > 0) {
        global.console.log(`[ ⚠ ] Se ocultaron ${excesoOrigen} pasajeros` +
            "en exceso de la lista de origen... ADVERTENCIA");
    }
    if (excesoDestino > 0) {
        global.console.log(`[⚠ ] Se ocultaron ${excesoDestino} pasajeros` +
            "en enceso de la lista de destino... ADVERTENCIA");
    }
}
function writeSupList(wb, data, config) {
    const ws = wb.addWorksheet("LISTA - SUPERVISOR");
    ws.properties.defaultRowHeight = 22;
    ws.pageSetup.orientation = "landscape";
    ws.pageSetup.paperSize = 9;
    ws.pageSetup.margins = { top: 0.3, bottom: 0.3, left: 0.8, right: 0.8, header: 0, footer: 0 };
    /* Cargamos el logo */
    const logo = wb.addImage({
        buffer: fs_1.default.readFileSync("./assets/logo.png"),
        extension: "png",
    });
    /* Insertamos la imagen */
    ws.addImage(logo, {
        br: { col: 2, row: 2.9 },
        tl: { col: 0.1, row: 0.1 },
    });
    /* Insertamos los datos de la cabecera */
    setBorder(ws, 2, 1, 1);
    ws.mergeCells("A1:B3");
    ws.getCell("C1").value = `LISTA DE ZARPE - SUPERVISOR`;
    setBorder(ws, 1, 1, 3);
    ws.getCell("C1").font = { size: 14, bold: true };
    ws.mergeCells("C1:M1");
    ws.getCell("C2").value = `Embarcación: ${config.nave} | Placa: ${config.placa} | ${config.ruta}`;
    setBorder(ws, 1, 2, 3);
    ws.getCell("C2").font = { size: 14, bold: true };
    ws.mergeCells("C2:M2");
    ws.getCell("C3").value = `Trayecto: ${config.trayecto} | Fecha: ${config.fecha}`;
    setBorder(ws, 1, 3, 3);
    ws.getCell("C3").font = { size: 14, bold: true };
    ws.mergeCells("C3:M3");
    /* Ponemos el tallarín de la celdas */
    ws.getColumn("A").width = 4;
    ws.getColumn("B").width = 18;
    ws.getColumn("C").width = 12;
    ws.getColumn("D").width = 6;
    ws.getColumn("E").width = 12;
    ws.getColumn("F").width = 8;
    ws.getColumn("G").width = 8;
    ws.getColumn("H").width = 4;
    ws.getColumn("I").width = 18;
    ws.getColumn("J").width = 12;
    ws.getColumn("K").width = 8;
    ws.getColumn("L").width = 12;
    ws.getColumn("M").width = 6;
    /* Alineamos las celdas */
    ws.getColumn("A").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("B").alignment = { vertical: "middle", horizontal: "left" };
    ws.getColumn("C").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("D").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("E").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("F").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("G").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("H").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("I").alignment = { vertical: "middle", horizontal: "left" };
    ws.getColumn("J").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("K").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("L").alignment = { vertical: "middle", horizontal: "center" };
    ws.getColumn("M").alignment = { vertical: "middle", horizontal: "center" };
    let r = 4;
    const sCol = 1;
    const bCol = 8;
    for (const p of data.puntos) {
        /* Si están vacíos no hacemos nada */
        if (p.suben.length === 0 && p.bajan.length === 0) {
            continue;
        }
        /* Cabecera */
        setBorder(ws, 5, r, 1);
        ws.getRow(r).height = 22;
        ws.getRow(r).getCell(sCol).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "c2cee0" } };
        ws.getRow(r).getCell(sCol).font = { bold: true, size: 13 };
        ws.getRow(r).getCell(sCol).value = p.nombre;
        ws.mergeCells(`A${r}:M${r}`);
        r++;
        ws.getRow(r).height = 22;
        ws.getRow(r).getCell(sCol).value = "Suben en este punto";
        ws.getRow(r).getCell(sCol).font = { bold: true, size: 12 };
        ws.mergeCells(`A${r}:F${r}`);
        ws.getRow(r).getCell(bCol).value = "Bajan en este punto";
        ws.getRow(r).getCell(bCol).font = { bold: true, size: 12 };
        ws.mergeCells(`H${r}:M${r}`);
        r++;
        /* Ponemos cabecera a los cuadros de surcada*/
        setBorder(ws, 6, r, 1);
        ws.getRow(r).height = 22;
        ws.getRow(r).getCell(sCol).value = "Nº";
        ws.getRow(r).getCell(sCol + 1).value = "Nombres";
        ws.getRow(r).getCell(sCol + 1).alignment = { vertical: "middle", horizontal: "center" };
        ws.getRow(r).getCell(sCol + 2).value = "Documento";
        ws.getRow(r).getCell(sCol + 2).alignment = { vertical: "middle", horizontal: "center" };
        ws.getRow(r).getCell(sCol + 3).value = "Edad";
        ws.getRow(r).getCell(sCol + 4).value = "Destino";
        ws.getRow(r).getCell(sCol + 5).value = "Precio";
        ws.getRow(r).getCell(sCol).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(sCol + 1).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(sCol + 2).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(sCol + 3).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(sCol + 4).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(sCol + 5).font = { bold: true, size: 11 };
        /* Ponemos cabecera a los cuadros de bajada*/
        setBorder(ws, 6, r, 8);
        ws.getRow(r).getCell(bCol).value = "Nº";
        ws.getRow(r).getCell(bCol + 1).value = "Nombres";
        ws.getRow(r).getCell(bCol + 1).alignment = { vertical: "middle", horizontal: "center" };
        ws.getRow(r).getCell(bCol + 2).value = "Documento";
        ws.getRow(r).getCell(bCol + 2).alignment = { vertical: "middle", horizontal: "center" };
        ws.getRow(r).getCell(bCol + 3).value = "Edad";
        ws.getRow(r).getCell(bCol + 4).value = "Origen";
        ws.getRow(r).getCell(bCol + 5).value = "Precio";
        ws.getRow(r).getCell(bCol).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(bCol + 1).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(bCol + 2).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(bCol + 3).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(bCol + 4).font = { bold: true, size: 11 };
        ws.getRow(r).getCell(bCol + 5).font = { bold: true, size: 11 };
        r++;
        ws.getRow(r).height = 22;
        let cS = 0;
        let cB = 0;
        for (const s of p.suben) {
            setBorder(ws, 6, r + cS, 1);
            const rowS = ws.getRow(r + cS);
            rowS.height = 22;
            rowS.getCell(sCol).value = cS + 1;
            rowS.getCell(sCol + 1).value = s.nombrecorto;
            rowS.getCell(sCol + 2).value = s.documento;
            rowS.getCell(sCol + 3).value = s.edad;
            rowS.getCell(sCol + 4).value = s.destino;
            rowS.getCell(sCol + 5).value = "S/. " + s.monto;
            cS++;
        }
        for (const b of p.bajan) {
            setBorder(ws, 6, r + cB, 8);
            const rowB = ws.getRow(r + cB);
            rowB.getCell(bCol).value = cB + 1;
            rowB.getCell(bCol + 1).value = b.nombrecorto;
            rowB.getCell(bCol + 2).value = b.documento;
            rowB.getCell(bCol + 3).value = b.edad;
            rowB.getCell(bCol + 4).value = b.origen;
            rowB.getCell(bCol + 5).value = "S/. " + b.monto;
            cB++;
        }
        /* Añadimos el espacio necesario para el siguiente cuadro */
        if (cS > cB) {
            r += cS + 1;
        }
        else {
            r += cB + 1;
        }
    }
}
