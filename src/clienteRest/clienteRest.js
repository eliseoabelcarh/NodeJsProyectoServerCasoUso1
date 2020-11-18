const axios = require('axios').default

function crearClienteRest(port) {
    return {
        verificarDniById: async (id) => {
            return await sendRequest({ url: crearURLBase(port) + `/verificardni/${id}`, method: 'post' })
        },
        get: async () => {
            return await sendRequest({ url: crearURLBase(port) + `/verificardni`, method: 'get' })
        }
    }
}

function crearURLBase(port) {
    return `http://localhost:${port}/api`
}

async function sendRequest(req) {
    try {
        const result = await axios(req)
        return result
    } catch (error) {
        if (error.response) {
            const NE = new Error(`error ${error.response.status} enviado desde el servidor: ${error.response.data.message}`)
            NE.status = error.response.status
            NE.message = error.response.data.message
            throw NE
        } else {
            throw new Error('error al enviar la peticion')
        }
    }
}

module.exports = { crearClienteRest }