const should = require('should');
const assert = require('assert')
const emailExample = require('../../src/models/examples');
const examples = require('../../src/models/examples');
const { crearEmailConTextoPlano,
    crearEmailConTextoPlanoYHtml,
    crearEmailConTextoPlanoYHtmlYAttachmentVacio,
    crearEmailConTextoPlanoYHtmlYAttachmentConFiles,
    //crearFileObject
} = require('../../src/models/email')

const { crearFileObject } = require('../../src/models/fileObject')



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
                    crearEmailConTextoPlano(emailSinAlgunCampo)
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

    describe('se crea email sin campo html requerido', () => {
        it('se recibe error de acuerdo al campo faltante', () => {
            assert.throws(() => {
                crearEmailConTextoPlanoYHtml(emailExample.sinHtml)
            }, (error) => {
                const esperado = 'html: campo requerido'
                assert.deepStrictEqual(esperado, error.message)
                return true
            })
        })
    })

    describe('se crea email sin campo attachment requerido', () => {
        it('se recibe error de acuerdo al campo faltante', () => {
            assert.throws(() => {
                crearEmailConTextoPlanoYHtmlYAttachmentVacio(emailExample.sinAttachment)
            }, (error) => {
                const esperado = 'attachments: campo requerido'
                assert.deepStrictEqual(esperado, error.message)
                return true
            })
        })
    })
    describe('se crea email sin ningún objeto File requerido', () => {
        it('se recibe error de acuerdo al campo faltante', () => {
            const archivosPaths = []
            assert.throws(() => {
                crearEmailConTextoPlanoYHtmlYAttachmentConFiles(emailExample.sinNingunFileObject, archivosPaths)
            }, (error) => {
                const esperado = 'fileObject: campo requerido'
                assert.deepStrictEqual(esperado, error.message)
                return true
            })
        })
    })

    describe('----PRUEBA MÚLTIPLE:----- se crea objetoFile sin algún campo requerido', () => {
        it('se recibe error de acuerdo al campo faltante', () => {
            const erroresARecibir = [
                'content: campo requerido',
                'filename: campo requerido',
                'type: campo requerido',
                'disposition: campo requerido'
            ]
            const camposInvalidos = [
                emailExample.objetoFileSinContent,
                emailExample.objetoFileSinFilename,
                emailExample.objetoFileSinType,
                emailExample.objetoFileSinDisposition
            ]
            async function test(objetoFileSinALgunCampo) {
                assert.throws(() => {
                    crearFileObject(objetoFileSinALgunCampo)
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



describe('CON MODELOS DE EMAILS VÁLIDOS', () => {

    describe('se crea email válido con TextoPlano y se recibe lo mismo', () => {
        it('se recibe lo esperado', () => {
            const emailValido = examples.validoTextoPlano
            const emailRecibido = crearEmailConTextoPlano(emailValido)
            assert.deepStrictEqual(emailRecibido, emailValido)
        })
    })

    describe('se crea email válido con Html y se recibe lo mismo', () => {
        it('se recibe lo esperado', () => {
            const emailValido = examples.validoTextoPlanoYHtml
            const emailRecibido = crearEmailConTextoPlanoYHtml(emailValido)
            assert.deepStrictEqual(emailRecibido, emailValido)
        })
    })

    describe('se crea email válido con Attachment y se recibe lo mismo', () => {
        it('se recibe lo esperado', () => {
            const emailValido = examples.validoTextoPlanoYHtmlYAttachmentVacio
            const emailRecibido = crearEmailConTextoPlanoYHtmlYAttachmentVacio(emailValido)
            assert.deepStrictEqual(emailRecibido, emailValido)
        })
    })

    describe('se crea objetoFile válido para Attachment y se recibe lo mismo', () => {
        it('se recibe lo esperado', () => {
            const objetoFileValido = examples.objetoFileValido
            const fileObjectRecibido = crearFileObject(objetoFileValido)
            assert.deepStrictEqual(fileObjectRecibido, objetoFileValido)
        })
    })

})