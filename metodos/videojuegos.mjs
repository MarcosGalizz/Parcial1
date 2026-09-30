import fsp from 'fs/promises'
export {obtenerVideojuegos}
// Ruta relativa al directorio desde donde se ejecuta node, por eso el servidor debe iniciarse desde la raíz del proyecto.
const ruta = './datos/videojuegos.json'
async function obtenerVideojuegos(){
    // No uso try/catch porque dejo que el error suba hasta la capa de rutas o middlewares, que sabe cómo manejarlo.
    // Leo el archivo en cada llamada (no al importar el módulo) para que los datos estén actualizados. Con 'utf-8' obtengo un string y no un Buffer.
    const datos = await fsp.readFile(ruta, 'utf-8')
    // JSON.parse convierte el texto en un array de objetos. Si el JSON es inválido lanza un SyntaxError que sube igual que el de readFile.
    return JSON.parse(datos)
}