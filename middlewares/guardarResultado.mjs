import fsp from 'fs/promises'
export {guardarResultado} // Middleware que guarda la ejecución del middleware anterior('ejecutarProcedimiento') en un archivo JSON.
// Misma lógica de ruta que en videojuegos.mjs. La carpeta 'resultados' debe existir: writeFile crea el archivo pero no las carpetas.
const ruta = './resultados/resultado.json'

const guardarResultado = async (req, res, next)=>{
    try{
        // writeFile necesita un string, por eso serializo req.resultado. El tercer argumento (2) indenta el JSON para que sea legible.
        const resultado = JSON.stringify(req.resultado, null, 2)
        await fsp.writeFile(ruta, resultado, {flag:"w"})
        // Escritura exitosa: next() pasa el control a la siguiente función de la cadena. Sin next() la petición quedaría colgada. Ref.: Express docs, Using middleware.
        next()
    }
    catch(error){
        // A diferencia de los servicios, acá sí capturo el error porque el middleware tiene acceso a 'res' y puede responder con un 500.
        console.log(error)
        res.status(500).json({error:"Error al guardar el resultado."})
    }
}