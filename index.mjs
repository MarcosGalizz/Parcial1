import express from 'express'
import { rutaApiV1 } from './rutas.mjs'

const PUERTO = 3000

const app = express()

app.use(rutaApiV1)

app.listen(PUERTO, ()=>{
    console.log(`Servidor escuchando en el puerto ${PUERTO}`)
})