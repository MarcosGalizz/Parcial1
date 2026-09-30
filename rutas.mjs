import { Router } from "express"
import { obtenerVideojuegos } from "./metodos/videojuegos.mjs"

import { ejecutarProcedimiento } from "./middlewares/procedimiento.mjs"
import { guardarResultado } from "./middlewares/guardarResultado.mjs"

export {rutaApiV1}
// Router de Express: agrupa las rutas en un módulo propio, separadas de la configuración del servidor (index.mjs).
const rutaApiV1 = Router()

// Endpoint REST para consultar todos los ítems. Como obtenerVideojuegos lee el JSON en cada llamada, la respuesta siempre está actualizada.
rutaApiV1.get("/api/v1/videojuegos", async (req, res)=>{
    try{
        const videojuegos = await obtenerVideojuegos()
        res.status(200).json(videojuegos)
    }
    catch(error){
        // 500: falla interna del servidor (lectura o parseo del JSON), no un error del cliente.
        res.status(500).json({error:"Error al intentar obtener los videojuegos."})
        console.log(error)
    }
})

// Endpoint REST con "ruta con parámetro": ":id" llega como string en req.params, por eso lo convierto a número para compararlo con el id del JSON.
rutaApiV1.get("/api/v1/videojuegos/:id", async(req, res)=>{
    const id = Number(req.params.id)
    if(!Number.isInteger(id)){ // Verifico si el id ingresado es un número entero
        res.status(400).json({error:"El id debe ser un número entero."})
        return
    }
    try{
        const videojuegos = await obtenerVideojuegos()
        const videojuegoBuscado = videojuegos.find(videojuego => videojuego.id === id)
        if(!videojuegoBuscado){
            res.status(404).json({error:"Videojuego no encontrado."}) // 404 en caso de que no se encuentre el videojuego con el id ingresado por el usuario.
            return
        }
        res.status(200).json(videojuegoBuscado)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Error al obtener el videojuego por id."})
    }
})

// Dos middlewares para mayor modularización y reutilización del código.
// Endpoint de procedimiento: queda fuera de REST porque la ruta expresa una acción y no un recurso.
rutaApiV1.get("/contar-stock-por-genero", ejecutarProcedimiento, guardarResultado, (req, res)=>{
    if(!req.resultado){
        res.status(500).json({error:"No hay resultados para mostrar."})
        return
    }
    res.status(200).json(req.resultado)
})