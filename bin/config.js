"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const toml_1 = __importDefault(require("toml"));
const punto_1 = require("./classes/punto");
const ruta_1 = require("./classes/ruta");
const filepath = path_1.default.join(path_1.default.dirname(process.execPath), "./config.toml");
const defaultConfig = `# Archivo de configuración del generador de rutas

[[rutas]]
nombre = "Ruta Yurimaguas"
puntos = ["Yurimaguas" ,"Progreso" ,"Portal" ,"Lagunas" ,"Nucuray" ,"Alianza","Maipuco",
          "San Pedro" ,"Saramuro","Puerto Lima", "Ollanta", "Castilla", "Lisboa","Nauta"]

[[rutas]]
nombre= "Ruta Frontera"
puntos=["Iquitos","Indiana", "Orán","Pebas","Nuevo Pebas","San Francisco","Cochiquinas","San Antonio",
        "Alto Monte","Imasa","San Isidro","San Pablo","Chimbote","Caballococha","San Antonio de Cacao",
        "Puerto Alegría","Santa Rosa"]


# Configuración de naves

[[naves]]
nombre = "Eduardo I"
capacidad = 159

[[naves]]
nombre = "Eduardo II"
capacidad = 159

[[naves]]
nombre = "Eduardo III"
capacidad = 83

[[naves]]
nombre = "Eduardo IV"
capacidad = 83`;
const exists = fs_1.default.existsSync(filepath);
if (exists === true) {
    global.console.log("[✓] Archivo de configuración correcto... OK");
}
else {
    global.console.log("[✗] El archivo de configuración no existe... ERROR");
    fs_1.default.writeFileSync(filepath, defaultConfig, { encoding: "utf8" });
    global.console.log("[✓] Se creó el archivo config.toml con la configuración por defecto... OK");
}
const config = toml_1.default.parse(fs_1.default.readFileSync(filepath, "utf-8"));
const rutas = [];
exports.rutas = rutas;
for (const r of config.rutas) {
    const puntos = [];
    for (const p of r.puntos) {
        const punto = new punto_1.Punto(p, [], []);
        puntos.push(punto);
    }
    const ruta = new ruta_1.Ruta(r.nombre, puntos);
    rutas.push(ruta);
}
const naves = config.naves;
exports.naves = naves;
