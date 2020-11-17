
const { crearEmailSender } = require('../../modulosAUsar/NodeJsEmailSenderModule/src/module')
const { getConfig } = require('../configs/mailerConfig')


const mailerFactory = (function () {

    let mailerInstance

    async function create(type) {
        if (type === 'sendgrid') {
            return await crearEmailSender(getConfig('sendgrid'))
        }
        else {
            return await crearEmailSender(getConfig('nodemailer'))
        }
    }

    return {
        getMailer: async (type = 'nodemailer') => {

            if (!mailerInstance) {
                mailerInstance = await create(type)
            }
            return mailerInstance
        }
    }

}
)()

module.exports = mailerFactory
