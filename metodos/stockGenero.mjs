import { obtenerVideojuegos } from "./videojuegos.mjs";
export {obtenerStockPorGenero}
const obtenerStockPorGenero = async ()=>{
    // No uso try/catch porque dejo que el error suba hasta la capa de rutas o middlewares, que sabe cómo manejarlo.
    const videojuegos = await obtenerVideojuegos()
    // Objeto acumulador: cada clave es un género y cada valor, el stock total de ese género.
    const stockPorGenero = {}
    videojuegos.forEach(videojuego => {
        // Asignación desestructurante para obtener el género y el stock del videojuego
        const {genero, stock} = videojuego
        // Si el género todavía no está en el acumulador lo inicializo con el stock del juego; si ya está, le sumo.
        if(!stockPorGenero[genero]){
            stockPorGenero[genero] = stock
        }
        else{
            stockPorGenero[genero]+= stock
        }
    });
    // Devuelvo qué se procesó ('proceso') y su resultado, como pide el punto 2 de la consigna.
    return {
        proceso: "Contar stock por género",
        resultado: stockPorGenero
    }
    
}