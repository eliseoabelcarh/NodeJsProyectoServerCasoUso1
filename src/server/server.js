const express = require('express')
const { crearRouterHandler } = require('./routerHandler')
const { errorHandler } = require('../errors/serverErrorHandler')




function createServer({ port = 0 }) {

    const app = express()

    app.use(express.json())

    app.use('/api/', crearRouterHandler())

    app.use(errorHandler)


    return new Promise((resolve, reject) => {
        const server = app.listen(port)
            .once('error', () => {
                reject(new Error('error al conectarse al servidor'))
            })
            .once('listening', () => {
                console.log('listening on port: ' + server.address().port)
                resolve(server)
            })
    })
}


module.exports = { createServer }