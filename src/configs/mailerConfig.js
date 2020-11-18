require('dotenv').config()




function getConfig(type) {
    if (type === 'sendgrid') {
        return {
            apiKey: process.env.SENDGRID_API_KEY,
            user: process.env.SENDGRID_USER_EMAIL,
            service: 'sendgrid'
        }
    }
    if (type === 'nodemailer') {
        return {
            user: process.env.GMAIL_FOR_NODEMAILER_USER,
            pass: process.env.GMAIL_PASSWORD_FOR_NODEMAILER,
            service: 'nodemailer'
        }
    }
    else {
        throw new Error('credenciales para servicio inexistente')
    }
}


module.exports = {
    getConfig
}