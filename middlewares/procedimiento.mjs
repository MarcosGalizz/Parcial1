import { obtenerStockPorGenero } from "../metodos/stockGenero.mjs"

export {ejecutarProcedimiento} // Middleware que ejecuta un procedimiento y guarda el resultado en la petición ('req.resultado')
const ejecutarProcedimiento = async(req, res, next)=>{
    try{
        const resultado = await obtenerStockPorGenero()
        // req y res son los mismos objetos durante toda la petición, así que lo que guardo en req lo ven los middlewares siguientes.
        req.resultado = resultado
        // Cedo el control al siguiente middleware de la cadena (guardarResultado).
        next()
    }
    catch(error){
        // Capturo acá el error que subió desde los servicios y lo traduzco a una respuesta HTTP 500.
        console.log(error)
        res.status(500).json({error:"Error al ejecutar el procedimiento."})
    }
}