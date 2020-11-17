const assert = require('assert')
const fs = require('fs')
const { crearEmailSender } = require('../../src/shared/emailModule')
const emailExample = require('../../src/models/examples')
require('dotenv').config()


describe('si no se tiene apiKey en objeto config o si no se tiene apiKey en archivo.env', () => {
    it('devuelve error', async () => {
        await assert.rejects(async () => {
            const config = {}
            const sender = await crearEmailSender(config)
        }, error => {
            const esperado = 'se necesita la apiKey'
            assert.deepStrictEqual(error.message, esperado)
            return true
        })
    })
})

describe('si no se envía Objeto de Configuracion', () => {
    it('devuelve error', async () => {
        await assert.rejects(async () => {
            const sender = await crearEmailSender()
        }, error => {
            const esperado = 'se necesita objeto config'
            assert.deepStrictEqual(error.message, esperado)
            return true
        })
    })
})



describe('con ApiKey inválida', () => {


    describe('se envía objeto de configuracion con objeto Email y algún campo inválido', () => {
        it('devuelve error de tipo INVALID_ARGS', async () => {

            const config = { apiKey: 'SG.SENDGRID_API_KEY' }
            const emailInvalido = emailExample.sinSender
            const sender = await crearEmailSender(config)

            await assert.rejects(async () => {
                await sender.sendEmailConTextoPlano(emailInvalido)
            }, error => {
                const esperado = 'INVALID_ARGS'
                assert.deepStrictEqual(error.type, esperado)
                return true
            })
        })
    })

    describe('se envía email TextoPlano con apikey inválida', () => {
        it('devuelve error de tipo INTERNAL_ERROR', async () => {

            const config = { apiKey: 'SG.API_KEY_INVALIDA' }
            const sender = await crearEmailSender(config)
            const emailValido = emailExample.validoTextoPlano

            await assert.rejects(async () => {
                await sender.sendEmailConTextoPlano(emailValido)
            }, error => {
                const esperadoType = 'INTERNAL_ERROR'
                const esperadoMsg = 'Envío de Email - error al enviar email'
                assert.deepStrictEqual(error.message, esperadoMsg)
                assert.deepStrictEqual(error.type, esperadoType)
                return true
            })
        })
    })

    describe('se envía email TextoPlanoYHml con apikey inválida', () => {
        it('devuelve error de tipo INTERNAL_ERROR', async () => {

            const config = { apiKey: 'SG.API_KEY_INVALIDA' }
            const sender = await crearEmailSender(config)
            const emailValido = emailExample.validoTextoPlanoYHtml

            await assert.rejects(async () => {
                await sender.sendEmailConTextoPlanoYHtml(emailValido)
            }, error => {
                const esperadoType = 'INTERNAL_ERROR'
                const esperadoMsg = 'Envío de Email - error al enviar email'
                assert.deepStrictEqual(error.message, esperadoMsg)
                assert.deepStrictEqual(error.type, esperadoType)
                return true
            })
        })
    })

})

describe('CON API KEY VALIDA', () => {

    const config = { apiKey: process.env.SENDGRID_API_KEY, user: process.env.SENDGRID_USER_EMAIL }


    describe('envío de email texto plano y con html', () => {
        it('se recibe mensaje de envío exitoso', async () => {
            const emailValido1 = emailExample.validoTextoPlano
            const emailValido2 = emailExample.validoTextoPlanoYHtml
            const esperado = true
            const sender = await crearEmailSender(config)
            const respuesta1 = await sender.sendEmailConTextoPlano(emailValido1)
            const respuesta2 = await sender.sendEmailConTextoPlanoYHtml(emailValido2)
            assert.deepStrictEqual(respuesta1, esperado)
            assert.deepStrictEqual(respuesta2, esperado)
        })
    })

    describe('envío de email con archivo adjunto', () => {
        it('se recibe mensaje de envío exitoso', async () => {
            const emailValido1 = emailExample.validoTextoPlanoYHtmlYAttachmentVacio
            const arrayConPathDeArchivos = ['test/assets/ejemplo.pdf']
            const esperado = true
            const sender = await crearEmailSender(config)
            const respuesta1 = await sender.sendEmailConTextoPlanoYHtmlYArchivosAdjuntos(emailValido1, arrayConPathDeArchivos)
            assert.deepStrictEqual(respuesta1, esperado)
        })
    })

    describe('envío de email con archivo adjunto y ruta de Archivo no existente o no válido', () => {
        it('se recibe error esperado', async () => {
            const emailValido1 = emailExample.validoTextoPlanoYHtmlYAttachmentVacio
            const arrayConPathDeArchivos = ['archivoQueNoExiste.pdf']
            const sender = await crearEmailSender(config)
            await assert.rejects(async () => {
                await sender.sendEmailConTextoPlanoYHtmlYArchivosAdjuntos(emailValido1, arrayConPathDeArchivos)
            }, error => {
                const esperadoType = 'INVALID_ARGS'
                const esperadoMsg = 'generando File Object: error en ruta de archivo'
                assert.deepStrictEqual(error.message, esperadoMsg)
                assert.deepStrictEqual(error.type, esperadoType)
                return true
            })


        })
    })


    describe.only('envío de email con campos mínimos y archivo adjunto opcionales', () => {
        it('se recibe mensaje de envío exitoso', async () => {
            const example = emailExample.validoTextoPlanoYHtmlYAttachmentVacio
            const arrayConPathDeArchivos = ['test/assets/ejemplo.pdf']
            const esperado = true
            const sender = await crearEmailSender(config)
            const respuesta1 = await sender.sendEmail({ to: example.to, subject: example.subject, text: example.html, attachments: arrayConPathDeArchivos })
            assert.deepStrictEqual(respuesta1, esperado)
        })
    })

})