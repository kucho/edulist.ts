import fs from "fs";
import path from "path";
import toml from "toml";
import { Nave } from "./classes/nave";
import { Punto } from "./classes/punto";
import { Ruta } from "./classes/ruta";

const filepath = path.join(path.dirname(process.execPath), "./config.toml");
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

const exists = fs.existsSync(filepath);

if (exists) {
    global.console.log("[✓] Archivo de configuración correcto... OK");
} else {
    global.console.log("[✗] El archivo de configuración no existe... ERROR");
    fs.writeFileSync(filepath, defaultConfig, { encoding: "utf8" });
    global.console.log("[✓] Se creó el archivo config.toml con la configuración por defecto... OK");
}

const config = toml.parse(fs.readFileSync(filepath, "utf-8"));
const rutas: Ruta[] = [];

for (const r of config.rutas) {
    const puntos: Punto[] = [];

    for (const p of r.puntos) {
        const punto = new Punto(p, [], []);
        puntos.push(punto);
    }

    const ruta = new Ruta(r.nombre, puntos);
    rutas.push(ruta);
}

const naves: Nave[] = config.naves;

export { rutas, naves };
