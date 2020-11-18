const mailerFactory = require('../../src/factories/mailerFactory')
const assert = require('assert')



describe('TEST PARA MAILER FACTORY ', async () => {

    let mailer

    before(async () => {
        mailer = await mailerFactory.getMailer()
    })

    describe('---------CON adjuntos', async () => {
        describe('envío mail de prueba con adjuntos por defecto nodemailer', async () => {
            it('envía mail y devuelve esperado', async () => {
                const mail = {
                    to: 'eliseoabelcarh1@gmail.com',
                    subject: 'Test for Factory email Nodemailer',
                    text: 'hello Moto Nodemailer!',
                    attachments: ['./assets/ejemplo.pdf']
                }
                const respuesta = await mailer.sendEmail(mail)
                assert.deepStrictEqual(respuesta, true)
            })
        })
    })

    describe('---------SIN adjuntos', async () => {
        describe('creo un mailer por defecto y le paso un mail', async () => {
            it('envía mail y devuelve esperado', async () => {
                const mail = {
                    to: 'rapibit@gmail.com',
                    subject: 'Test Factory Nodemailer sin adjuntos',
                    text: 'hello Moto Nodemailer!',
                }
                const respuesta = await mailer.sendEmail(mail)
                assert.deepStrictEqual(respuesta, true)
            })
        })

    })
})

