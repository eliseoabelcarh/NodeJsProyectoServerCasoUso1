const { crearEmailSender } = require('./src/shared/emailModule')


async function crearSender(config) {
    return await crearEmailSender(config)
}





module.exports = {
    crearSender
}