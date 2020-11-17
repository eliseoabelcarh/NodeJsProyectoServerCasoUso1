const CUFactory = require('../../src/factories/CUFactory')
const daoFactory = require('../../src/factories/daoFactory')
const assert = require('assert')

describe('TEST PARA CU FACTORY ', async () => {

    let dao
    before(async () => {
        dao = await daoFactory.getDao()
    })
    after(async () => {
        await dao.cleanAll()
    })

    describe('agrego usuario y verifico que nombres registrados coincidan con fotoDni', async () => {
        it('devuelve respuesta válida', async () => {
            const datos = {
                nombres: 'JAMIE FALKLAND',
                apellidos: 'ANDERSON',
                email: 'eliseoabelcarh@gmail.com',
                pathDniFront: './assets/dniANDERSON.jpg'
            }
            const id = await dao.addUser(datos)
            const CUVerificarNombres = await CUFactory.getCUVerificarNombresRegistradosEnFotoDni()
            const respuesta = await CUVerificarNombres.validarInfoEnDbConFotoDni({ userId: id })
            assert.deepStrictEqual(respuesta, true)
        })
    })
})
