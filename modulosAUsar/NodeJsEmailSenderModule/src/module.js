


const { crearEmailSenderNodemailer } = require('../src/nodemailer')
const { crearEmailSenderSendgrid } = require('../src/sendgrid')

const crearEmailSender = async function (config) {
    if (!config) {
        throw new Error('se necesita objeto config')
    }

    if (config.service === 'sendgrid') {
        return await crearEmailSenderSendgrid(config)
    }
    if (config.service === 'nodemailer') {
        return await crearEmailSenderNodemailer(config)
    }
    else {
        return await crearEmailSenderNodemailer(config)
    }


}


module.exports = { crearEmailSender }