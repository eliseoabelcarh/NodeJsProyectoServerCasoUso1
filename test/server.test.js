const assert = require('assert')
const axios = require('axios')
const { crearClienteRest } = require('../src/clienteRest/clienteRest')
const daoFactory = require('../src/factories/daoFactory')
const { createServer } = require('../src/server/server')

describe('TEST PARA SERVER Y CASO DE USO', async () => {


    let server
    let clienteRest
    let dao

    before(async () => {
        server = await createServer({})
        clienteRest = crearClienteRest(server.address().port)
        dao = await daoFactory.getDao()
    })

    after(async () => {
        await server.close()
        await dao.cleanAll()
    })

    describe('verifico que ruta Api del server anda bien', async () => {
        it('devuelve status 200 y mensaje okay', async () => {
            const respuesta = await clienteRest.get()
            assert.deepStrictEqual(200, respuesta.status)
            assert.deepStrictEqual('okay', respuesta.data)
        })
    })
    describe('no paso id a ruta API', async () => {
        it('devuelve status 400', async () => {
            await assert.rejects(async () => {
                await clienteRest.verificarDniById()
            }, error => {
                assert.deepStrictEqual(400, error.status)
                assert.deepStrictEqual('id: argumento vacío', error.message)
                return true
            })
        })
    })
    describe('paso id de usuario agregado en BD', async () => {
        it('devuelve status 400', async () => {
            const datos = {
                id: 22,
                nombres: 'JAMIE FALKLAND',
                apellidos: 'ANDERSON',
                email: 'eliseoabelcarh@gmail.com',
                pathDniFront: './assets/dniANDERSON.jpg'
            }
            const id = await dao.addUser(datos)
            const { status, data } = await clienteRest.verificarDniById(id)
            assert.deepStrictEqual(true, data.dniVerificado)
            assert.deepStrictEqual(200, status)
        })
    })
})