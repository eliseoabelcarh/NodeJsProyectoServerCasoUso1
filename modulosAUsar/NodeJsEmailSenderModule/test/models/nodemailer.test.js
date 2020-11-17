
const emailExample = require('./examples')
const { crearEmail } = require('../../models/nodemailer')
const assert = require('assert')
const should = require('should')

describe('CON MODELOS DE EMAILS INVÁLIDOS Y CAMPOS FALTANTES', () => {

    describe('----PRUEBA MÚLTIPLE:---- se crea email sin algún campo requerido', () => {
        it('se recibe error de acuerdo al campo faltante', () => {
            const erroresARecibir = [
                'from: campo requerido',
                'to: campo requerido',
                'subject: campo requerido',
                'text: campo requerido'
            ]
            const camposInvalidos = [
                emailExample.sinSender,
                emailExample.sinRecipient,
                emailExample.sinSubject,
                emailExample.sinMessage
            ]
            async function test(emailSinAlgunCampo) {
                assert.throws(() => {
                    crearEmail(emailSinAlgunCampo)
                }, (error) => {
                    erroresARecibir.should.matchAny(error.message)
                    return true
                })
            }
            for (let i = 0; i < camposInvalidos.length; i++) {
                const element = camposInvalidos[i];
                test(element)
            }


        })
    })

})