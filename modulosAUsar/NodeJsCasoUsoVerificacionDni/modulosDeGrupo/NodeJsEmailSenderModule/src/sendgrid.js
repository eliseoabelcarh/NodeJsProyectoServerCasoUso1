
const { crearSender } = require('../modulosPropios/NodeJsSendGridEmailSenderModule')


const crearEmailSenderSendgrid = async (config) => {
    return await crearSender(config)
}

module.exports = {
    crearEmailSenderSendgrid
}