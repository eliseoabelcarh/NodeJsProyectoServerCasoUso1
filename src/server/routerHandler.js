const express = require('express')
const CUFactory = require('../factories/CUFactory')
const { crearErrorArgumentosInvalidos } = require('../errors/apiError')


let wrap = fn => (...args) => fn(...args).catch(args[2])

function crearRouterHandler() {

    router = express.Router()

    router.post('/verificarDni/:id', wrap(async (req, res) => {
        if (!req.params.id || req.params.id == 'undefined') {
            throw crearErrorArgumentosInvalidos('id', 'argumento vacío')
        }
        const id = req.params.id
        const CUVerificarNombres = await CUFactory.getCUVerificarNombresRegistradosEnFotoDni()
        const respuesta = await CUVerificarNombres.validarInfoEnDbConFotoDni({ userId: id })
        res.json({ dniVerificado: respuesta })
    }))

    router.get('/verificarDni', wrap(async (req, res) => {
        res.status(200).send('okay')
    }))

    return router
}


module.exports = { crearRouterHandler }