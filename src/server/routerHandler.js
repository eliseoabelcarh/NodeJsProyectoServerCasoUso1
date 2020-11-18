const express = require('express')
const CUFactory = require('../factories/CUFactory')
const { crearErrorArgumentosInvalidos } = require('../errors/apiError')


let wrap = fn => (...args) => fn(...args).catch(args[2])

function crearRouterHandler() {

    router = express.Router()

    /**
    * @typedef ENDPOINT
    * @description Se envía como params el id del usuario a verificar
    * @summary Se verifica que nombres guardados en base de datos 
    * correspondan con la foto del dni guardada en base de datos 
    * @property {'POST'} /api/verificarDni/:id params: Id del usuario
    */
    router.post('/verificarDni/:id', wrap(async (req, res) => {

        if (!req.params.id || req.params.id == 'undefined') {
            throw crearErrorArgumentosInvalidos('id', 'argumento vacío')
        }
        const CUVerificarNombres = await CUFactory.getCUVerificarNombresRegistradosEnFotoDni()
        const respuesta = await CUVerificarNombres.validarInfoEnDbConFotoDni({ userId: req.params.id })
        res.json({ dniVerificado: respuesta })

    }))


    /**
    * @typedef ENDPOINT
    * @description Ruta de Prueba a Servidor - Status 200
    * @property {'GET'} /api/verificarDni devuelve mensaje prueba 'ok'
    */
    router.get('/verificarDni', wrap(async (req, res) => {
        res.status(200).send('okay')
    }))

    return router
}


module.exports = { crearRouterHandler }