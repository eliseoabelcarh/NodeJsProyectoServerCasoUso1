

require('dotenv').config()
const assert = require('assert')
const { crearEmailSender } = require('../../src/module')


describe('---- PARA NODEMAILER', () => {
    describe('envío mail', () => {
        it('recibo respuesta exitosa', async () => {
            //reemplace variables de entorno creando un archivo .env
            const config = {
                user: process.env.GMAIL_FOR_NODEMAILER_USER,
                pass: process.env.GMAIL_PASSWORD_FOR_NODEMAILER,
                service: 'nodemailer'
            }
            const emailSender = await crearEmailSender(config)
            const mail = {
                from: config.user,
                to: 'eliseoabelcarh1@gmail.com',
                subject: 'Hola Desde Acá Nodemailer',
                text: 'helloooo moto!',
                attachments: ['./test/assets/ejemplo.pdf']
            }
            const recibido = await emailSender.sendEmail(mail)
            const esperado = true
            assert.deepStrictEqual(recibido, esperado)
        })
    })
})



describe('---- PARA SENDGRID', () => {
    it('envío de email con campos mínimos y archivo adjunto opcionales', async () => {
        //regístrate en la página de Sendgrid/Twilio para obtener una Apikey
        //reemplace variables de entorno creando un archivo .env
        const config = {
            apiKey: process.env.SENDGRID_API_KEY,
            user: process.env.SENDGRID_EMAIL,
            service: 'sendgrid'
        }
        const email = {
            to: 'eliseoabelcarh1@gmail.com',
            subject: 'Holaaa!! desde Sendgrid',
            html: '<strong>Esto es un mensaje</strong>'
        }
        //arrayConPathDeArchivos opcional
        const arrayConPathDeArchivos = ['./test/assets/ejemplo.pdf']
        const esperado = true
        const sender = await crearEmailSender(config)
        const respuesta1 = await sender.sendEmail({ to: email.to, subject: email.subject, text: email.html, attachments: arrayConPathDeArchivos })
        assert.deepStrictEqual(respuesta1, esperado)
    })
})


