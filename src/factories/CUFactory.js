const { crearVerificadorDeIdentidad } = require('../../modulosAUsar/NodeJsCasoUsoVerificacionDni/src/shared/verificadorDeIdentidad')
const { createTextFromImageReader } = require('../../modulosAUsar/NodeJsReadTextFromImageModule/src/shared/textFromImageReader')
const mailerFactory = require('./mailerFactory')
const daoFactory = require('./daoFactory')

/**
 * @module CUFactory
 * @requires daoFactory
 * @requires mailerFactory
 * @requires verificadorDeIdentidad
 * @requires emailSenderModule
 */

/**
  * @function CUFactory
  * @summary Devuelve un Objeto con Casos de Uso
  * @returns {Object} CasoDeUso Singleton Instance
  */
const CUFactory = (function () {

    let instance

    function create() {
        return CasosDeUso
    }
    return {
        getInstance: () => {
            if (!instance) {
                instance = create()
            }
            return instance
        }
    }
})()

const CasosDeUso = {

    getCUVerificarNombresRegistradosEnFotoDni: async () => {
        const dao = await daoFactory.getDao()
        const lectorDni = await createTextFromImageReader()
        const mailer = await mailerFactory.getMailer()
        const verificador = await crearVerificadorDeIdentidad(dao, lectorDni, mailer)
        return verificador
    }
}

module.exports = CUFactory.getInstance()

